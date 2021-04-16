import React, { useEffect, useState } from 'react'
import './lobbyPage.css'
import CalendarBubble from './lobbyComponents/CalendarBubble'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { Link, Redirect } from "react-router-dom";

function LobbyPage() {

  const [joined, setJoined] = useState(false);
  const [renderjoined, setrenderjoined] = useState(false);
  var token = sessionStorage.getItem("token")
  let data = {
      'token' : token,
    }
  fetch('/app/lobby',{
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
          if(res.msg !== "zero"){
            console.log(res)
            setJoined(res)
            setrenderjoined(true)
          }

      })

  const renderRedirect = () =>{       //If no token, sends user back to login
    var token = sessionStorage.getItem("token")
    if(token === null){
      return(
        <Redirect to ="/login"/>
      )
    }
  }

  const renderJoinedsBubble = () =>{
    if(joined !== undefined && renderjoined === true){
      var placeholder = [];
      for(var i = 0; i < joined.length;i++){
        var nameplaceholder = joined[i].name;
        var calendarnumber = joined[i].membercount;
        placeholder.push(<CalendarBubble title={nameplaceholder} number={calendarnumber}/>);
      }
      console.log(placeholder)
      return (placeholder)
    }
  }

    // // If invalid credentials, alert user
    // const renderIncorrect = () =>{
    //   if(incorrect){
    //     var placeholder = [];
    //     placeholder.push(<p1 key="unique1" className="incorrect-credentials">Username or password incorrect.</p1>);
    //     placeholder.push(<p1 key="unique2" className="incorrect-credentials">Username or password incorrect.</p1>);
    //     return(
    //       placeholder
    //     )
    //   }
    // }
  

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
                {renderJoinedsBubble()}
                <CalendarBubble title="CSE312 Group" number="4"/>
                <CalendarBubble title="Family schedule" number="4"/>
                <CalendarBubble title="Personal" number="1"/>
            </div>
        </div>
    </div>
  );
}

export default LobbyPage;