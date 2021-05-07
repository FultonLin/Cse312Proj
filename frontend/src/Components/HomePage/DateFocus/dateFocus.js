import React, { useEffect, useState } from 'react'
import './dateFocus.css'
import moment from 'moment'

function DateFocus({ title, socket, username, dated, clickedDayChange }) {
  const [currentMessage, setCurrentMessage] = useState('');

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
      <p class="message-box">
        <div class="message-box-text">
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
      </p>
    </div>
  );
}

export default DateFocus;