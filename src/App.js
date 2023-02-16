import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {

  API = process.env.REACT_APP_NEWS_API;

  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress});
  }

  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        height={4}
        color='white'
        progress={this.state.progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={6} country="in" APIkey={this.API} category="general"/>}></Route>
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={6} country="in" APIkey={this.API} category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={6} country="in" APIkey={this.API} category="entertainment"/>}></Route>
          <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={6} country="in" APIkey={this.API} category="general"/>}></Route>
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={6} country="in" APIkey={this.API} category="health"/>}></Route>
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={6} country="in" APIkey={this.API} category="science"/>}></Route>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={6} country="in" APIkey={this.API} category="sports"/>}></Route>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={6} country="in" APIkey={this.API} category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}

