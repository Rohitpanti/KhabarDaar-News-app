import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category:'general'
    }
    static propTypes = {
        country:PropTypes.string,
        pageSize: PropTypes.number,
        category:PropTypes.string
    }
    
capitalize=(string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: true,
            page:1,
            totalResults:0
        }
        document.title=`KhabarDaar-${this.capitalize(this.props.category)}`;
    }

    async updateNews(){
        this.props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIkey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await  fetch(url);
        this.props.setProgress(30);
        let parsedData= await data.json();
        this.props.setProgress(70);
        //console.log(parsedData);
        this.setState({articles: parsedData.articles,
            totalResults:parsedData.totalResults,
            loading: false})
            this.props.setProgress(100);
    }

    async componentDidMount(){
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=820ad9b0c5164547a165b7e287dc358f&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await  fetch(url);
        // let parsedData= await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles,
        //     totalResults:parsedData.totalResults,
        //     loading: false})
        this.updateNews();
    }


    // handlePrevClick = async() => {

    //     this.setState({page:this.state.page-1});
    //     this.updateNews();
    // }
    // handleNextClick = async ()=>{
    //     this.setState({page:this.state.page-1});
    //     this.updateNews();
    // }


    fetchMoreData = async() => {
        this.setState({page:this.state.page +1});
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=820ad9b0c5164547a165b7e287dc358f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await  fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false})
      };


render() {
    return (
    <>
      
        <h1 className='text-center'style={{margin:'30px 0px'}}>|| TaazaKhabre - {this.capitalize(this.props.category)} ke Top Headlines ||</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner/>}
        >
        <div className='container'>
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        
      
      </>
    )
  }
}

export default News