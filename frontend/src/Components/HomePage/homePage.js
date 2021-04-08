import React, {useState} from 'react'
import './homePage.css'
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useLocation} from "react-router-dom";

import Calendar from './Calendar/calendar'
import Social from './Social/social'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome} from '@fortawesome/free-solid-svg-icons'

function HomePage() {

  const [goHome, setGoHome] = useState(false);

  const renderRedirect = () =>{       //If no token, sends user back to login
    var token = sessionStorage.getItem("token")
    if(token === null){
      return(
        <Redirect to ="/login"/>
      )
    }
  }

  const redirectHome = () =>{
    if(goHome){
      return(
        <Redirect to="/lobby"/>
      )
    }
  }

  return (
    <div className="Home-container">
      {renderRedirect()}
      {redirectHome()}
        <div className="Lobby-headers">
          <h1 className="Lobby-title">Calendarify.</h1>
          <div className="Nav-buttons">
            <div className="Lobby-profile" onClick={() => setGoHome(true)}><FontAwesomeIcon icon={faHome} size="2x"/></div>
            <div className="Lobby-profile"><FontAwesomeIcon icon={faUser} size="2x"/></div>
          </div>
        </div>
        <div className="Home-content-container">
          <div className="Calendar-container">
            <Calendar/>
          </div>
          <div className="Social-container">
            <Social/>
          </div>
        </div>
    </div>
  );
}

export default HomePage;