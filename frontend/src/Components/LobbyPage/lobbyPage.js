import React, { useEffect, useState } from 'react'
import './lobbyPage.css'
import CalendarBubble from './lobbyComponents/CalendarBubble'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { Link, Redirect } from "react-router-dom";

function LobbyPage() {

  const [joined, setJoined] = useState(false);
  const [renderjoined, setrenderjoined] = useState(false);
  const [goProfile, setGoProfile] = useState(false)
  const [goCreate, setGoCreate] = useState(false)
  

    useEffect(() => {
      // Calls this request only once per render
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
    }, []);

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
      return (placeholder)
    }
  }

  //Goes to profile page
  const redirectProfile = () =>{
    if(goProfile){
      return(
        <Redirect to="/profile"/>
      )
    }
  }

  //Goes to create calendar page
  const redirectCreate = () =>{
    if(goCreate){
      return(
        <Redirect to="/calendarCreate"/>
      )
    }
  }
  
  return (

    <div className="Lobby-container">
      {renderRedirect()}
      {redirectProfile()}
      {redirectCreate()}
        <div className="Lobby-headers">
          <h1 className="Lobby-title">Calendarify.</h1>
          <div className="Nav-buttons">
            <div className="Lobby-profile" onClick={() => setGoProfile(true)}><FontAwesomeIcon icon={faUser} size="2x"/></div>
          </div>
        </div>
        <div className="Lobby-center-container">
            <h1>Your calendars</h1>
            <div className="Lobby-join-create-container">
                <button className="Lobby-join-button">Join someone's calendar</button>
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