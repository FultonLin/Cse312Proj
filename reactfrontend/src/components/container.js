import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useLocation} from "react-router-dom";

import LoginPage from './LoginPage/loginPage'
import CreatePage from './CreatePage/createPage'
import LobbyPage from './LobbyPage/lobbyPage'
import HomePage from './HomePage/homePage'

function Container() {
  return (
    <Router>
        <Switch>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/create" exact component={CreatePage}/>
            <Route path="/lobby" exact component={LobbyPage}/>
            <Route path ="/" exact component={HomePage}/>
        </Switch>
    </Router>
  );
}

export default Container;