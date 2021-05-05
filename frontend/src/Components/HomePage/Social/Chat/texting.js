import React, { useState } from 'react'
import './texting.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

function Texting({ title, selectedUser, socket, username, chats, privateChats }) {

    const [currentMessage, setCurrentMessage] = useState('')

    const handleMessageChange = (e) => {
        setCurrentMessage(e.target.value)
    }

    const sendMessage = () => {
        setCurrentMessage('')
        socket.emit('sendMessage', { 'username': username, 'title': title, 'sentTo': selectedUser, 'currentMessage': currentMessage })
    }

    return (
        <div className="Texting-inner-container">
            <div className="texting-input">
                <input placeholder="Send message..." className="texting-input-inner" onChange={e => handleMessageChange(e)} value={currentMessage}></input>
                <button className="texting-button" onClick={() => sendMessage()}><FontAwesomeIcon icon={faArrowUp} /></button>
            </div>
            <div className="texting-convo">
                {selectedUser == 'Everyone' ?
                    <div className='reverse'>
                        {chats.map((chat) => (
                            chat.username === username ?
                                <div className="message">
                                    <p1 className="message-sender">{chat.username}</p1>
                                    <div className="message-bubble">
                                        <p1>{chat.currentMessage}</p1>
                                    </div>
                                </div>
                                :
                                <div className="message-other">
                                    <p1 className="message-sender-other">{chat.username}</p1>
                                    <div className="message-bubble-other">
                                        <p1>{chat.currentMessage}</p1>
                                    </div>
                                </div>
                        ))}
                    </div>
                    :
                    <div className='reverse'>
                        {privateChats.map((chat) => (
                            chat.username == username && chat.sentTo == selectedUser || chat.username == selectedUser && chat.sentTo == username
                                ?
                                chat.username === username ?
                                    <div className="message">
                                        <p1 className="message-sender">{chat.username}</p1>
                                        <div className="message-bubble">
                                            <p1>{chat.currentMessage}</p1>
                                        </div>
                                    </div>
                                    :
                                    <div className="message-other">
                                        <p1 className="message-sender-other">{chat.username}</p1>
                                        <div className="message-bubble-other">
                                            <p1>{chat.currentMessage}</p1>
                                        </div>
                                    </div>
                                :
                                <p></p>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default Texting;