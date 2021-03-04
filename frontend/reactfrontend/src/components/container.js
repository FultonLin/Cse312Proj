import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useLocation} from "react-router-dom";

import LoginPage from './LoginPage/loginPage'
import HomePage from './HomePage/homePage'

function Container() {
  return (
    <Router>
        <Switch>
            <Route path="/login" exact component={LoginPage}/>
            <Route path ="/" exact component={HomePage}/>
        </Switch>
    </Router>
  );
}

export default Container;