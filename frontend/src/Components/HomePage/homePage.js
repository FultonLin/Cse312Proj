import React, {useState} from 'react'
import './homePage.css'
import { Redirect } from "react-router-dom";
import logoutFunction from '../Logout/logoutFunction'
import Calendar from './Calendar/calendar'
import Social from './Social/social'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function HomePage() {

  const [goHome, setGoHome] = useState(false);
  const [goProfile, setGoProfile] = useState(false);
  const [goLogin, setGoLogin] = useState(false);

  window.addEventListener('beforeunload', (event) => {
    event.returnValue = logoutFunction(setGoLogin);
  });

   //Dark mode css
   var dark = sessionStorage.getItem('darkmode')

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
            <Calendar/>
          </div>
          <div className="Social-container">
            <Social/>
          </div>
        </div>
    </div>
  );
}

export default HomePage;