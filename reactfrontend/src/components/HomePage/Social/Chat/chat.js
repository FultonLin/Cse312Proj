import React from 'react'
import './chat.css'

import Texting from './texting'

function Chat() {
  return (
    <div className="chat-container-inner">
        <p1 className="chat-header">Chat</p1>
        <select className="dropdown">
            <option>Everyone</option>
            <option>Jordan</option>
            <option>Christopher</option>
            <option>Fulton</option>
            <option>Simon</option>
        </select>
        <div className="texting-container">
            <Texting/>
        </div>
    </div>
  );
}

export default Chat;