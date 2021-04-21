import React, { useEffect, useState } from 'react'
import './JoinCalendarBubble.css'
import { Link, Redirect } from "react-router-dom";
import joinCalendar from './joinCalendarFunction'

function JoinCalendarBubble({ title }) {
  const [goHome, setGoHome] = useState(false);

  //Go home if home button clicked
  const redirectHome = () => {
    if (goHome) {
      return (
        <Redirect to="/lobby" />
      )
    }
  }

  return (
    <button className="Lobby-calendar-bubble">
      {redirectHome()}
      <h1 className="Lobby-calendar-title">{title}</h1>
      <div onClick={() => joinCalendar(title, setGoHome)}>Join</div>
    </button>
  );
}

export default JoinCalendarBubble;