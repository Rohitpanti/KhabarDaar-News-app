import './App.css';

import React,{ useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function App()  {

  const API = process.env.REACT_APP_NEWS_API1;

  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        height={4}
        color='white'
        progress={progress}
        /> 
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={6} country="in" APIkey={API} category="general"/>}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={6} country="in" APIkey={API} category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={6} country="in" APIkey={API} category="entertainment"/>}></Route>
          <Route exact path="/general" element={<News setProgress={setProgress} key="general" pageSize={6} country="in" APIkey={API} category="general"/>}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={6} country="in" APIkey={API} category="health"/>}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={6} country="in" APIkey={API} category="science"/>}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={6} country="in" APIkey={API} category="sports"/>}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={6} country="in" APIkey={API} category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
}



