import React, { useEffect, useState } from 'react'
import './lobbyPage.css'
import CalendarBubble from './lobbyComponents/CalendarBubble'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from "react-router-dom";
import logoutFunction from '../Logout/logoutFunction'

function LobbyPage() {

  const [joined, setJoined] = useState(false);
  const [renderjoined, setrenderjoined] = useState(false);
  const [goProfile, setGoProfile] = useState(false);
  const [goCreate, setGoCreate] = useState(false);
  const [goJoin, setGoJoin] = useState(false);
  const [goLogin, setGoLogin] = useState(false);
  const [username, setUsername] = useState('');

  //Dark mode css
  var dark = sessionStorage.getItem('darkmode')


  useEffect(() => {
    // Calls this request only once per render
    var token = sessionStorage.getItem("token")
    let data = {
      'token': token,
    }
    fetch('/app/lobby', {
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
        if (res.msg !== "zero") {
          console.log(res)
          setJoined(res)
          console.log("here")
          var token = sessionStorage.getItem("token")
          let data = {
            'token': token,
          }
          fetch('/app/profile', {
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
              setUsername(res[0])
              setrenderjoined(true)
            })
        }
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

  const renderJoinedsBubble = () => {
    if (joined !== undefined && renderjoined === true) {
      var placeholder = [];
      console.log(joined)
      for (var i = 0; i < joined.length; i++) {
        var nameplaceholder = joined[i].name;
        var calendarnumber = joined[i].membercount;
        var uniqueId = "uniqueId" + i;
        placeholder.push(<CalendarBubble key={uniqueId} title={nameplaceholder} number={calendarnumber} username={username} />);
      }
      return (placeholder)
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

  //Goes to create calendar page
  const redirectCreate = () => {
    if (goCreate) {
      return (
        <Redirect to="/calendar/create" />
      )
    }
  }

  //Goes to create calendar page
  const redirectJoin = () => {
    if (goJoin) {
      return (
        <Redirect to="/calendar/join" />
      )
    }
  }

  //Go to login
  const redirectLogin = () => {
    if (goLogin) {
      return (
        <Redirect to="/login" />
      )
    }
  }

  return (

    <div className={dark === 'true' ? 'dark-Lobby-container' : "Lobby-container"}>
      {renderRedirect()}
      {redirectProfile()}
      {redirectCreate()}
      {redirectJoin()}
      {redirectLogin()}
      <div className="Lobby-headers">
        <h1 className={dark === 'true' ? "dark-Lobby-title" : "Lobby-title"}>Calendarify.</h1>
        <div className="Nav-buttons">
          <div className="Lobby-profile" onClick={() => logoutFunction(setGoLogin)}><FontAwesomeIcon icon={faSignOutAlt} size="2x" /></div>
          <div className="Lobby-profile" onClick={() => setGoProfile(true)}><FontAwesomeIcon icon={faUser} size="2x" /></div>
        </div>
      </div>
      <div className="Lobby-center-container">
        <h1 className={dark === 'true' ? 'dark-calendar-title' : ''}>Your calendars</h1>
        <div className="Lobby-join-create-container">
          <button className="Lobby-join-button" onClick={() => setGoJoin(true)}>Join someone's calendar</button>
          <button className="Lobby-create-button" onClick={() => setGoCreate(true)}>Create Calendar</button>
        </div>
        <div className="Lobby-calendar-bubble-container">
          {renderJoinedsBubble()}
        </div>
      </div>
    </div>
  );
}

export default LobbyPage;