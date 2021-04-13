import React, { useEffect, useState } from 'react';
import './calendarCreatePage.css';
import { Link, Redirect } from 'react-router-dom';
import createCalendar from './calendarCreateFunction';

function CalendarCreatePage() {
  const [name, setName] = useState('')

  const [redirect, setRedirect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

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

  return (
    <div className="Create-Container">
      {returnRedirect()}
        <div className="Create-Bubble-Container">
            <h1>Create a Calendar.</h1>
            <form className="Create-Bubble">
              <div className="Create-Text">
                <h1>Name of Calendar</h1>
                <input type = "text" onChange={handleNameChange} value={name} className="Create-input" placeholder="Name"/>
                {renderIncorrect()}
                <div className="Create-button" onClick={() => createCalendar(name, setRedirect, setIncorrect, setName)} type="submit">Create</div>
              </div>
            </form>
            <button className="Create-button"><Link to="/lobby">Back to Lobby</Link></button>
        </div>
    </div>
  );
}

export default CalendarCreatePage;