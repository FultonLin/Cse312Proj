import React, {useState, useEffect} from 'react'
import './chat.css'

import Texting from './texting'

function Chat({members, currentlyOnline, socket, title, username, chats, privateChats}) {

  const [selectedUser, setSelectedUser] = useState('Everyone');

  const handleChange = (e) =>{
    setSelectedUser(e.target.value)
  }

  return (
    <div className="chat-container-inner">
        <p1 className="chat-header">Chat</p1>
        <select className="dropdown" onChange={(e) => handleChange(e)} >
            <option value='Everyone'>Everyone</option>
            {currentlyOnline.map((user) => (
              user.title == title ?
              <option value={user.username}>{user.username}</option>
              :
              <div></div>
            ))}
        </select>
        <div className="texting-container">
            <Texting title={title} selectedUser={selectedUser} socket={socket} username={username} chats={chats} privateChats={privateChats}/>
        </div>
    </div>
  );
}

export default Chat;