import React, { useEffect, useState } from 'react'
import './homePage.css'
import { Redirect, useLocation } from "react-router-dom";
import logoutFunction from '../Logout/logoutFunction'
import Calendar from './Calendar/calendar'
import Social from './Social/social'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import io from "socket.io-client";
let socket;

function HomePage() {
  const [calendarInfo, setCalendarInfo] = useState(false);
  const [goHome, setGoHome] = useState(false);
  const [goProfile, setGoProfile] = useState(false);
  const [goLogin, setGoLogin] = useState(false);
  const [onlineUsers, setOnlineUSers] = useState([]);
  //Dark mode css
  var dark = sessionStorage.getItem('darkmode');
  var paramData = useLocation().data;


  // window.addEventListener('beforeunload', (event) => {
  //   event.returnValue = logoutFunction(setGoLogin);
  // });

  useEffect(() => {
    // Calls this request only once per render
    var token = sessionStorage.getItem("token")
    let data = {
      'token': token,
      paramData,
    }
    console.log(window.location.pathname)
    fetch('/app/home', {
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
        setCalendarInfo(res)
        console.log(res)
      })
  }, []);

  useEffect(() =>{
    console.log('trying to connect...')
    socket = io.connect('http://localhost:5000')
    if(paramData !== undefined){
      var title = paramData.title
      var username = paramData.username
      socket.emit('loggedin', {'username': username, 'title': title})
    }

    return () => {
      socket.disconnect();
      socket.off();
    }
      // socket.emit('joinCalendar', {'username': username, 'title': title})
    

  }, ['http://localhost:5000']);

  useEffect(() =>{
    socket.on('userUpdate', message =>{
      setOnlineUSers(message.msg)
    });
  }, []);


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

  //Goes to profile page
  const redirectProfile = () =>{
    if(goProfile){
      return(
        <Redirect to="/profile"/>
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


  console.log(onlineUsers)
  return (
    <div className={dark === 'true'? 'dark-Home-container': "Home-container"}>
      {renderRedirect()}
      {redirectHome()}
      {redirectProfile()}
      {redirectLogin()}
        <div className="Lobby-headers">
          <h1 className={dark === 'true'? 'dark-Lobby-title': "Lobby-title"}>Calendarify.</h1>
          <div className="Nav-buttons">
          <div className="Lobby-profile" onClick={() => logoutFunction(setGoLogin)}><FontAwesomeIcon icon={faSignOutAlt} size="2x" /></div>
            <div className="Lobby-profile" onClick={() => setGoHome(true)}><FontAwesomeIcon icon={faHome} size="2x"/></div>
            <div className="Lobby-profile" onClick={() => setGoProfile(true)}><FontAwesomeIcon icon={faUser} size="2x"/></div>
          </div>
        </div>
        <div className="Home-content-container">
          <div className="Calendar-container">
          <div></div>
          <Calendar/>
          </div>
          <div className="Social-container">
          <Social key="social1" title={calendarInfo.name} count={calendarInfo.membercount} members={calendarInfo.members} online={calendarInfo.online} currentlyOnline={onlineUsers}/>
          </div>
        </div>
    </div>
  );
}

export default HomePage;