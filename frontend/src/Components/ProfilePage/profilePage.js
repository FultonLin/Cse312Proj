import React, { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import './profilePage.css';
import ProfilePull from './profileFunction';
import DarkModeFunction from './darkmodeFunction';
import logoutFunction from '../Logout/logoutFunction'
import defaultProfile from '../../Images/default-profile.png'

function ProfilePage() {

  const [goHome, setGoHome] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [goLogin, setGoLogin] = useState(false);

  //Dark mode css
  var dark = sessionStorage.getItem('darkmode')

  useEffect(() => {
    // Calls this request only once per render
    ProfilePull(setUsername, setEmail, setDarkMode)
  }, []);

  // If invalid credentials, alert user
  const renderRedirect = () =>{       //If no token, sends user back to login
    var token = sessionStorage.getItem("token")
    if(token === null){
      return(
        <Redirect to ="/login"/>
      )
    }
  }

  //Go home if home button clicked
  const redirectHome = () =>{
    if(goHome){
      return(
        <Redirect to="/lobby"/>
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

  const triggerDarkCall = () =>{
      setDarkMode(!darkMode)
      DarkModeFunction(darkMode)
  }

 

  function profilePicture() {

    const renderPFP = () => {
      return (<img src={defaultProfile} className="profile-picture" alt="Profile avatar" />)
    }

    return (
      <div className="pfp">
        {renderPFP()}
      </div>
    );
  
  }

  console.log(dark === true)
  return (
    <div className={dark === 'true' ? "dark-Login-Container" : "Login-Container"}>
      {renderRedirect()}
      {redirectHome()}
      {redirectLogin()}
      <div className="Login-Bubble-Container">
        <div className={dark === 'true' ? 'dark-profile-header' :  "profile-header"}>
          <h1>Your Profile.</h1>
          <div className="Lobby-profile" onClick={() => logoutFunction(setGoLogin)}><FontAwesomeIcon icon={faSignOutAlt} size="2x" /></div>
          <div className="Lobby-profile" onClick={() => setGoHome(true)}><FontAwesomeIcon icon={faHome} size="2x"/></div>
        </div>
        <div className="Login-Bubble">
          <div className="Login-Text">
            <h>Profile</h>
            <div className="profile-subcontainer">
                <h1 className="profilePage-subtitle">Your username:</h1>
                <h>{username}</h>
            </div>
            <div className="profile-subcontainer">
                <h1 className="profilePage-subtitle">Your email:</h1>
                <h>{email}</h>
            </div>
            <div className="darkmode-container">
                <h1 className="profilePage-subtitle">Dark mode:</h1>
                <input type="checkbox" className="darkmode-checkbox" onClick={() => triggerDarkCall()} checked={darkMode}/>
            </div>
            <div className="pfp-container">
                <h1 className="profilePage-subtitle">Your profile picture: </h1>
                  {profilePicture()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;