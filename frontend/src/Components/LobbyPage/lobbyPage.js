import React from 'react'
import './lobbyPage.css'


import CalendarBubble from './lobbyComponents/CalendarBubble'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'

function LoginPage() {
  return (
    <div className="Lobby-container">
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
                <button className="Lobby-create-button">Create calendar</button>
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