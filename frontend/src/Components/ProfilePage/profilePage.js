import React, { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import './profilePage.css';
import ProfilePull from './profileFunction';
import DarkModeFunction from './darkmodeFunction';
import logoutFunction from '../Logout/logoutFunction'
import defaultProfile from '../../Images/default-profile.png'
import pfpUpdate from './pfpFunction'

function ProfilePage() {

  
  const [goHome, setGoHome] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [pfp, setPfp] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [goLogin, setGoLogin] = useState(false);

  //Dark mode css
  var dark = sessionStorage.getItem('darkmode')
  var token = sessionStorage.getItem('token')

  const handlePfpChange = (e) => {//set pfp
    setPfp(e.target.value)
  }

  useEffect(() => {
    // Calls this request only once per render
    ProfilePull(setUsername, setEmail, setDarkMode, setPfp)
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

  function componentDidMount(){
    var pick = ""
    fetch('/app/profile/images', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      return data;
    })
  }

  function profilePicture() {

    const renderPFP = () => {
      
      return (<img src={componentDidMount()} className="profile-picture" alt="Profile avatar" />)
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
                <h>{pfp}</h>
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
                <h1 className="profilePage-subtitle"><nobr>Your profile picture: </nobr></h1>
                  {profilePicture()}
            </div>
            <nobr>
            <div className="newpfp-container">
                <h1 className="profilePage-subtitle">Upload new picture: </h1>
                <form action="/app/pictureUpload" className="pfp-upload" id="image-form" method="post" enctype="multipart/form-data">
                    <input type="file" name="upload" accept="jpg"/>
                    <input type="text" name="token" id="tokenpost" value={token}></input>
                      <input type="submit" value="Submit"></input>  
                  </form>
            </div>
            </nobr>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;