import React from 'react'
import './CalendarBubble.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

function CalendarBubble({ title, number , username}) {
  return (
    <Link to={{ pathname: '/home', data: { title, username } }} style={{ textDecoration: 'none' }}>
      <button className="Lobby-calendar-bubble">
        <h1 className="Lobby-calendar-title">{title}</h1>
        <h1 className="Lobby-number">{number}&nbsp;<FontAwesomeIcon icon={faUsers}/></h1>
      </button>
    </Link >
  );
}

export default CalendarBubble;