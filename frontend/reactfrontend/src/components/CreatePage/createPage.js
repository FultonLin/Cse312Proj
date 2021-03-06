import React from 'react'
import './createPage.css'
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useLocation} from "react-router-dom";

function CreatePage() {
  return (
    <div className="Create-Container">
        <div className="Create-Bubble-Container">
            <h1>Welcome to Calendarify.</h1>
            <div className="Create-Bubble">
                <div className="Create-Text">
                    <h1>Create an account</h1>
                    <input className="Create-input" placeholder="Username"></input>
                    <input className="Create-input" placeholder="Email"></input>
                    <input className="Create-input" placeholder="Password" type="password"></input>
                    <Link to="/lobby"><button className="Create-button">Create!</button></Link>
                </div>
            </div>
            <button className="Create-create-div"><p1>Create an account</p1></button>
        </div>
    </div>
  );
}

export default CreatePage;