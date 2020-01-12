import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import BrowsePage from './pages/BrowsePage'
import AskPage from './pages/AskPage'
import HomePage from './pages/HomePage'
import SingleQuestionPage from './pages/SingleQuestionPage'
import SearchPage from './pages/SearchPage'
import NotFound from './pages/NotFound'
import axios from 'axios'
import apiServer from './apiServer'

const App = () => {
  const [searchTerm, setSearchTerm] = useState()

  // const searchInput = async term => {
  //   if (term) {
  //     const resp = await axios.get(`${apiServer}/api/Question`)
  //     console.log(resp)
  //   }
  // }

  return (
    <Router>
      <header>
        <hr className="orangeBar"></hr>
        <nav className="navBackground">
          {/* prettier-ignore */}
          <ul className="topNav">
            <li><a href="/"><img height="50px" width="200px" src="/images/stacklogo.png" /></a></li>
            <li className="navList home"><Link to="/">Home</Link></li>
            <li className="navList-search"><input className="navSearch" type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} /></li>
            <li className="navList browse"><Link to={`/Search/${searchTerm}`}>Search</Link></li>
            <li className="navList browse"><Link to="/Browse">Browse</Link></li>
            <li className="navList ask"><Link to="/Ask">Ask A Question</Link></li>
          </ul>
        </nav>
      </header>
      {/* prettier-ignore */}
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/Browse" component={BrowsePage}></Route>
        <Route exact path="/Ask" component={AskPage}></Route>
        <Route exact path="/Single/:id" component={SingleQuestionPage}></Route>
        <Route exact path="/Search/:SearchTerm" component={SearchPage}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
