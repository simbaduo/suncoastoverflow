import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import BrowsePage from './pages/BrowsePage'
import AskPage from './pages/AskPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <header>
        <hr className="orangeBar"></hr>
        <nav>
          <ul className="topNav">
            <li>
              <a href="/">
                <img height="50px" width="200px" src="./images/stacklogo.png" />
              </a>
            </li>
            <li className="navList home">
              <Link to="/">Home</Link>
            </li>
            <li className="navList-search">
              <input
                className="navSearch"
                type="text"
                placeholder="Search..."
              />
            </li>
            <li className="navList browse">
              <Link to="/Browse">Browse</Link>
            </li>
            <li className="navList ask">
              <Link to="/Ask">Ask A Question</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/Browse" component={BrowsePage}></Route>
        <Route exact path="/Ask" component={AskPage}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
