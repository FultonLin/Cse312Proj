import React from 'react'
import './social.css'
import defaultProfile from '../../../Images/default-profile.png'
import online from '../../../Images/online.png'
import offline from '../../../Images/offline.png'

function OnlinePicture({ username, status }) {

  const renderJoinedsBubble = () => {
    if (status == 'online') {
      return (<img src={online} className="profile-picture-online" alt="Profile avatar" />)
    } else {
      return (<img src={offline} className="profile-picture-online" alt="Profile avatar" />)
    }
  }

  return (
    <div className="online-profile-box">
      {renderJoinedsBubble()}
      <p1>{username}</p1>
    </div>
  );
}

export default OnlinePicture;