import React, { useEffect, useState } from 'react';
import './createPage.css';
import { Link, Redirect } from 'react-router-dom';
import createCheck from './createFunction';

function CreatePage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [redirect, setRedirect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

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

  // If login valid go to lobby
  const returnRedirect = () =>{
    if(redirect){
      return(
        <Redirect to= "/lobby"/>
      )
    }
  }

  // If invalid credentials, alert user
  const renderIncorrect = () =>{
    if(incorrect){
      return(
        <p1 className="incorrect-credentials">Username or email already taken</p1>
      )
    }
  }

  return (
    <div className="Create-Container">
      {returnRedirect()}
        <div className="Create-Bubble-Container">
            <h1>Welcome to Calendarify.</h1>
            <form className="Create-Bubble">
              <div className="Create-Text">
                <h1>Create an account</h1>
                <input type = "text" onChange={handleUsernameChange} value={username} className="Create-input" placeholder="Username"/>
                <input type = "email" onChange={handleEmailChange} value={email} className="Create-input" placeholder="Email"/>
                <input type = "password" onChange={handlePasswordChange} value={password} className="Create-input" placeholder="Password"/>
                {renderIncorrect()}
                <div className="Create-button" onClick={() => createCheck(username, email, password, setRedirect, setIncorrect, setUsername, setEmail)} type="submit">Create!</div>
              </div>
            </form>
            <Link to="/login"><button className="Login-create-div"><p1>Login</p1></button></Link>
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