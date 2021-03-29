import React, { useEffect, useState } from 'react';
import './createPage.css';
import { Link } from 'react-router-dom';

function CreatePage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("Account creation")
    let data = {
      'username' : username,
      'email' : email,
      'password' : password
    }
    console.log(data)
    fetch('/app/create',{
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="Create-Container">
        <div className="Create-Bubble-Container">
            <h1>Welcome to Calendarify.</h1>
            <form className="Create-Bubble">
              <div className="Create-Text">
                <h1>Create an account</h1>
                <input type = "text" onChange={handleUsernameChange} value={username} className="Create-input" placeholder="Username"/>
                <input type = "email" onChange={handleEmailChange} value={email} className="Create-input" placeholder="Email"/>
                <input type = "password" onChange={handlePasswordChange} value={password} className="Create-input" placeholder="Password"/>
                <button className="Create-button" onClick={onSubmitClick} type="submit">Create</button>
              </div>
            </form>
            <Link to="/login">Move to Login Page</Link>
            {/* <div className="Create-Bubble">
                <div className="Create-Text">
                    <h1>Create an account</h1>
                    <input type = "text" className="Create-input" placeholder="Username"></input>
                    <input type = "email" className="Create-input" placeholder="Email"></input>
                    <input type = "password"className="Create-input" placeholder="Password" type="password"></input>
                    <Link to="/lobby"><button className="Create-button">Create!</button></Link>
                </div>
            </div> */}
        </div>
    </div>
  );
}

export default CreatePage;