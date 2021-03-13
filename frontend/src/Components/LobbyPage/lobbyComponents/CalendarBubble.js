import React from 'react'
import './CalendarBubble.css'

import {BrowserRouter as Router, Route, Switch, Link, Redirect, useLocation} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

function CalendarBubble({title, number}) {
  return (
    <Link to="/home" style={{ textDecoration: 'none' }}><button className="Lobby-calendar-bubble">
        <h1 className="Lobby-calendar-title">{title}</h1>
        <h1 className="Lobby-number">{number}&nbsp;<FontAwesomeIcon icon={faUsers}/></h1>
    </button></Link>
  );
}

export default CalendarBubble;