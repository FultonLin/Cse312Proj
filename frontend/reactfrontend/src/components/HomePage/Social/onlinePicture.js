import React from 'react'
import './social.css'
import defaultProfile from '../../../images/default-profile.png'

function OnlinePicture({username}) {
  return (
    <div className="online-profile-box">
        <img src={defaultProfile} className="profile-picture-online"/>
        <p1>{username}</p1>
    </div>
  );
}

export default OnlinePicture;