import React, { useEffect, useState } from 'react'
import './social.css'
import OnlinePicture from './onlinePicture'
import Chat from './Chat/chat'


function Social({ title, count, members, online }) {

  const renderJoinedsBubble = () => {
    var placeholder = [];
    console.log(members);
    console.log(online)
    for (const member in members) {
      var nameplaceholder = members[member];
      var status = 'offline';
      for (const user in online) {
        var userplaceholer = online[user];
        if (nameplaceholder === userplaceholer) {
          status = 'online';
        }
      }
      console.log(nameplaceholder);
      placeholder.push(<OnlinePicture username={nameplaceholder} status={status} />);

    }
    return (placeholder)
  }

  return (
    <div className="social-container">
      <h1 className="calendar-code">Name: {title}</h1>
      <div className="online-bar">
        <p1 className="number-online">Members Joined: ({count})</p1>
        <div className="scrolling-profile">
          {renderJoinedsBubble()}
        </div>
      </div>
      <div className="chat-container">
              <Chat/>
      </div>
    </div>
  );
}

export default Social;