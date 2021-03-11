import React from 'react'
import './texting.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'

function Texting() {
  return (
    <div className="Texting-inner-container">
        <div className="texting-input">
            <input placeholder="Send message..." className="texting-input-inner"></input>
            <button className="texting-button"><FontAwesomeIcon icon={faArrowUp}/></button>
        </div>
        <div className="texting-convo">
        <div className="message">
            <p1 className="message-sender">Me</p1>
            <div className="message-bubble">
                <p1>Okay, we should probably get more of the backend done in the meantime before our meeting</p1>
            </div>
        </div>
        <div className="message-other">
            <p1 className="message-sender-other">Simon</p1>
            <div className="message-bubble-other">
                <p1>Cool with me</p1>
            </div>
        </div>
        <div className="message">
            <p1 className="message-sender">Me</p1>
            <div className="message-bubble">
                <p1>Our checkpoint is scheduled for next week, I'm gonna add it to the calendar, is that cool with everyone?</p1>
            </div>
        </div>
        <div className="message-other">
            <p1 className="message-sender-other">Fulton</p1>
            <div className="message-bubble-other">
                <p1>It was okay, not the easiest one but it wasn't crazy hard in my opinion.</p1>
            </div>
        </div>
        <div className="message-other">
            <p1 className="message-sender-other">Christopher</p1>
            <div className="message-bubble-other">
                <p1>How did everyone do on the homework? I thought it wasn't too bad.</p1>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Texting;