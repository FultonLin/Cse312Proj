import React, { useEffect, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome} from '@fortawesome/free-solid-svg-icons'

import './profilePage.css';
import ProfilePull from './profileFunction';
import DarkModeFunction from './darkmodeFunction';

function ProfilePage() {

  const [goHome, setGoHome] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [darkMode, setDarkMode] = useState(false)

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

  const triggerDarkCall = () =>{
      setDarkMode(!darkMode)
      DarkModeFunction(darkMode)
  }

  return (
    <div className="Login-Container">
      {renderRedirect()}
      {redirectHome()}
      <div className="Login-Bubble-Container">
          <div className="profile-header">
            <h1>Your Profile.</h1>
            <div className="Lobby-profile" onClick={() => setGoHome(true)}><FontAwesomeIcon icon={faHome} size="2x"/></div>
          </div>
        <div className="Login-Bubble">
                <div className="Login-Text">
                    <h1>Profile</h1>
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
                </div>
            </div>
      </div>
    </div>
  );
}

export default ProfilePage;