import React, { useEffect, useState } from 'react';
import './calendarCreatePage.css';
import { Link, Redirect } from 'react-router-dom';
import createCalendar from './calendarCreateFunction';

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
            <h1 className={dark === 'true' ? 'dark-create-title': ''}>Create a Calendar.</h1>
            <form className={dark === 'true' ? 'dark-Create-Bubble' : "Create-Bubble"}>
              <div className="Create-Text">
                <h1 className={dark === 'true' ? 'dark-create-title': ''}>Name of Calendar</h1>
                <input type = "text" onChange={handleNameChange} value={name} className={dark === 'true' ? 'dark-Create-input' : "Create-input"} placeholder="Name"/>
                {renderIncorrect()}
                <div className={dark === 'true' ? 'dark-Create-button': "Create-button"} onClick={() => createCalendar(name, setRedirect, setIncorrect, setName)} type="submit">Create</div>
              </div>
            </form>
            <button className={dark === 'true' ? 'dark-Create-button': "Create-button"} onClick={() => setGoLobby(true)}>Back to Lobby</button>
        </div>
    </div>
  );
}

export default CalendarCreatePage;