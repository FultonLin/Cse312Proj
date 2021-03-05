import React from 'react'
import './CalendarBubble.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

function CalendarBubble({title, number}) {
  return (
    <div className="Lobby-calendar-bubble">
        <h1 className="Lobby-calendar-title">{title}</h1>
        <h1 className="Lobby-number">{number}&nbsp;<FontAwesomeIcon icon={faUsers}/></h1>
    </div>
  );
}

export default CalendarBubble;