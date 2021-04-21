import React, { useEffect, useState } from 'react';
import './joinCalendarPage.css';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import JoinCalendarBubble from './JoinCalendarBubble/JoinCalendarBubble'

function JoinCalendarPage() {

  const [goHome, setGoHome] = useState(false);
  const [unjoined, setUnJoined] = useState(false);
  const [goProfile, setGoProfile] = useState(false);

  //Dark mode css
  var dark = sessionStorage.getItem('darkmode')

  useEffect(() => {
    // Calls this request only once per render
    var token = sessionStorage.getItem("token")
    let data = {
      'token': token,
    }
    fetch('/app/calendar/all', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.text())
      .then(data => {
        var res = JSON.parse(data)
        setUnJoined(res)
        console.log(res)
      })
  }, []);

  const renderRedirect = () => {       //If no token, sends user back to login
    var token = sessionStorage.getItem("token")
    if (token === null) {
      return (
        <Redirect to="/login" />
      )
    }
  }

  const renderUnJoinedBubble = () => {
    if (unjoined !== undefined) {
      var placeholder = [];
      for (var i = 0; i < unjoined.length; i++) {
        var nameplaceholder = unjoined[i].name;
        var uniqueId = "uniqueId" + i
        placeholder.push(<JoinCalendarBubble key={uniqueId} title={nameplaceholder} />);
      }
      return (placeholder)
    }
  }

  //Go home if home button clicked
  const redirectHome = () => {
    if (goHome) {
      return (
        <Redirect to="/lobby" />
      )
    }
  }

  //Goes to profile page
  const redirectProfile = () => {
    if (goProfile) {
      return (
        <Redirect to="/profile" />
      )
    }
  }

  return (

    <div className={dark === 'true' ? 'dark-Lobby-container' : "Lobby-container"}>
      {renderRedirect()}
      {redirectProfile()}
      {redirectHome()}
      <div className="Lobby-headers">
        <h1 className={dark === 'true' ? "dark-Lobby-title" : "Lobby-title"}>Join a Calendar.</h1>
        <div className="Nav-buttons">
          <div className="Lobby-profile" onClick={() => setGoProfile(true)}><FontAwesomeIcon icon={faUser} size="2x" /></div>
          <div className="Lobby-profile" onClick={() => setGoHome(true)}><FontAwesomeIcon icon={faHome} size="2x" /></div>
        </div>
      </div>
      <div className="Lobby-center-container">
        <div className="Lobby-calendar-bubble-container">
          {renderUnJoinedBubble()}
        </div>
      </div>
    </div>
  );
}

export default JoinCalendarPage;