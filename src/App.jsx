import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Page from './pages/Page'
import Page2 from './pages/Page2'
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
              <img height="50px" width="200px" src="./images/stacklogo.png" />
            </li>
            <li className="homeListItem">
              <Link to="/">Home</Link>
            </li>
            <li className="searchListItem">
              <input
                className="navSearch"
                type="text"
                placeholder="Search..."
              />
            </li>
            <li className="searchListItem">
              <Link to="/1">Browse</Link>
            </li>
            <li className="topListItem">
              <Link to="/2">Ask A Question</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/1" component={Page}></Route>
        <Route exact path="/2" component={Page2}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
