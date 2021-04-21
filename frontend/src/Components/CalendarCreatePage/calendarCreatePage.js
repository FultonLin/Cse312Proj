import React, { useState } from 'react';
import './calendarCreatePage.css';
import { Redirect } from 'react-router-dom';
import createCalendar from './calendarCreateFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function CalendarCreatePage() {
  const [name, setName] = useState('')

  const [redirect, setRedirect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [goLobby, setGoLobby] = useState(false);

  //Dark mode css
  var dark = sessionStorage.getItem('darkmode')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  // If valid name go to lobby
  const returnRedirect = () =>{
    if(redirect){
      return(
        <Redirect to= "/lobby"/>
      )
    }
  }

  const renderIncorrect = () =>{
    if(incorrect){
      return(
        <p1 className="incorrect-credentials">Name field is Empty or Used</p1>
      )
    }
  }

  const redirectLobby = () =>{
    if(goLobby){
      return(
        <Redirect to="/lobby"/>
      )
    }
  }

  return (
    <div className={dark === 'true' ? 'dark-Create-Container': "Create-Container"}>
      {returnRedirect()}
      {redirectLobby()}
      <div className="Create-Bubble-Container">
        <div className={dark === 'true' ? 'dark-create-header' : ''}>
          <h1>Create a Calendar.</h1>
          <div className="Lobby-profile" onClick={() => setGoLobby(true)}><FontAwesomeIcon icon={faHome} size="2x" /></div>
        </div>
        <form className={dark === 'true' ? 'dark-Create-Bubble' : "Create-Bubble"}>
          <div className="Create-Text">
            <h1 className={dark === 'true' ? 'dark-create-title': ''}>Name of Calendar</h1>
            <input type = "text" onChange={handleNameChange} value={name} className={dark === 'true' ? 'dark-Create-input' : "Create-input"} placeholder="Name"/>
            {renderIncorrect()}
            <div className={dark === 'true' ? 'dark-Create-button': "Create-button"} onClick={() => createCalendar(name, setRedirect, setIncorrect, setName)} type="submit">Create</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CalendarCreatePage;