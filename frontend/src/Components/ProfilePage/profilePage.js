import React, { useEffect, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome} from '@fortawesome/free-solid-svg-icons'

import './profilePage.css';

function ProfilePage() {

  const [goHome, setGoHome] = useState(false);


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
                        <h>Username</h>
                    </div>
                    <div className="profile-subcontainer">
                        <h1 className="profilePage-subtitle">Your email:</h1>
                        <h>Email</h>
                    </div>
                    <div className="darkmode-container">
                        <h1 className="profilePage-subtitle">Dark mode:</h1>
                        <input type="checkbox" name="name" id="id"  className="darkmode-checkbox"/>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}

export default ProfilePage;