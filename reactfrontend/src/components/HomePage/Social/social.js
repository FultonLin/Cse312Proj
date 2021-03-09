import React from 'react'
import './social.css'

import OnlinePicture from './onlinePicture'
import Chat from './Chat/chat'


function Social() {
  return (
    <div className="social-container">
        <h1 className="calendar-code">Code: 373589</h1>
        <div className="online-bar">
            <p1 className="number-online">Online: (4)</p1>
            <div className="scrolling-profile">
                <OnlinePicture username="Jordan"/>
                <OnlinePicture username="Christopher"/>
                <OnlinePicture username="Fulton"/>
                <OnlinePicture username="Simon"/>
            </div>
        </div>
        <div className="chat-container">
                <Chat/>
        </div>
    </div>
  );
}

export default Social;