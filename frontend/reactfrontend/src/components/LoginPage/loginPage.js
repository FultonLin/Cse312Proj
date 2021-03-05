import React from 'react'
import './loginPage.css'
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useLocation} from "react-router-dom";

function LoginPage() {
  return (
    <div className="Login-Container">
        <div className="Login-Bubble-Container">
            <h1>Welcome to Calendarify.</h1>
            <div className="Login-Bubble">
                <div className="Login-Text">
                    <h1>Login</h1>
                    <input className="Login-input" placeholder="Username"></input>
                    <input className="Login-input" placeholder="Password"></input>
                    <Link to="/lobby"><button className="Login-button">Log in</button></Link>
                </div>
            </div>
            <Link to="/create"><button className="Login-create-div"><p1>Create an account</p1></button></Link>
        </div>
    </div>
  );
}

export default LoginPage;