import React,{useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';


const News =(props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
const capitalize=(string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

    const updateNews=async() =>{
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.APIkey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await  fetch(url);
        props.setProgress(30);
        let parsedData= await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title=`KhabarDaar-${capitalize(props.category)}`;
        updateNews();
        // eslint-disable-next-line
        }, [])
    

    const fetchMoreData = async() => {
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.APIkey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        setLoading(true);
        let data = await  fetch(url);
        let parsedData= await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
      };



    return (
    <>
        <h1 className='text-center'style={{margin:'30px 0px',marginTop:'90px'}}>|| TaazaKhabre - {capitalize(props.category)} ke Top Headlines ||</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading && <Spinner/>}
        >
        <div className='container'>
        <div className="row">
        {articles.map((element)=>{
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


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category:'general'
}
News.propTypes = {
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
}
export default News