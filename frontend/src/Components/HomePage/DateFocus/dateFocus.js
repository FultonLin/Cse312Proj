import React, { useEffect, useState } from 'react'
import './dateFocus.css'
import moment from 'moment'
import Calendar from '../Calendar/calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'


function DateFocus({ title, socket, username, dated, clickedDayChange }) {
  //Date message to Set
  const [currentMessage, setCurrentMessage] = useState('');
  console.log("----------------------------------------")
  console.log(clickedDayChange.format('MM-DD-YYYY'))

  const handleMessageChange = (e) => {
    setCurrentMessage(e.target.value)
  }

  const sendMessage = () => {
    setCurrentMessage('');
    if (currentMessage.length != 0) {
      socket.emit('sendDay', { 'username': username, 'title': title, 'changingDate': clickedDayChange.format('MM-DD-YYYY'), 'currentMessage': currentMessage });
    }
  }

  const sendDelete = () => {
    socket.emit('deleteDay', { 'username': username, 'title': title, 'changingDate': clickedDayChange.format('MM-DD-YYYY') });
  }

  return (
    <div className="social-container">
      <div className="dateinfobox">
        <div className="current-date">Current Day Selected: </div>
        <div className="current-date">{clickedDayChange.format('MM-DD-YYYY')}</div>
      </div>
      <div className="date-input-box">
        <textarea rows="5" className="input-day" placeholder="Change Day" onChange={e => handleMessageChange(e)} value={currentMessage}></textarea><br />
        <button className="changing-button" onClick={() => sendMessage()}>Change Date</button>
        <button className="changing-button" onClick={() => sendDelete()}>Clear Date</button>
      </div>
      {/* {renderCheckDateResponse()} */}
      <div>
        {dated.map((date) => (date.changingDate == clickedDayChange.format('MM-DD-YYYY')
          ?
          <div>
            <p1>{date.currentMessage}</p1>
          </div>
          :
          <div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateFocus;