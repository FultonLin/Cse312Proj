import React, {useEffect} from 'react'
import './lobbyPage.css'
import { Link, Redirect } from "react-router-dom";
import CalendarBubble from './lobbyComponents/CalendarBubble'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'

function LoginPage() {

  const renderRedirect = () =>{       //If no token, sends user back to login
    var token = sessionStorage.getItem("token")
    if(token === null){
      return(
        <Redirect to ="/login"/>
      )
    }
  }

  return (
    <div className="Lobby-container">
      {renderRedirect()}
        <div className="Lobby-headers">
          <h1 className="Lobby-title">Calendarify.</h1>
          <div className="Nav-buttons">
            <div className="Lobby-profile"><FontAwesomeIcon icon={faUser} size="2x"/></div>
          </div>
        </div>
        <div className="Lobby-center-container">
            <h1>Your calendars</h1>
            <div className="Lobby-join-create-container">
                <button className="Lobby-join-button">Join someone's calendar</button>
                <button className="Lobby-create-button"><Link to="/calendarCreate">Create Calendar</Link></button>
            </div>
            <div className="Lobby-calendar-bubble-container">
                <CalendarBubble title="CSE312 Group" number="4"/>
                <CalendarBubble title="Family schedule" number="4"/>
                <CalendarBubble title="Personal" number="1"/>
            </div>
        </div>
    </div>
  );
}

export default LoginPage;