import React, { useEffect, useState } from 'react'
import './loginPage.css'
import { Link, Redirect } from "react-router-dom";
import loginCheck from './loginFunction';

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [redirect, setRedirect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const handleUsernameChange = (e) => {//set username when inputed
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {//set passsword when inputed
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
        <p1 className="incorrect-credentials">Username or password incorrect.</p1>
      )
    }
  }

  return (
    <div className="Login-Container">
      {returnRedirect()}
        <div className="Login-Bubble-Container">
            <h1>Welcome to Calendarify.</h1>
            <div className="Login-Bubble">
                <div className="Login-Text">
                    <h1>Login</h1>
                    <input type = "text" onChange={handleUsernameChange} value={username} className="Login-input" placeholder="Username"/>
                    <input type = "password" onChange={handlePasswordChange} value={password} className="Login-input" placeholder="Password" type="password"/>
                    {renderIncorrect()}
                    <div className="Login-button" onClick={() => loginCheck(username, password, setRedirect, setIncorrect, setUsername, setPassword)}>Log in</div>
                </div>
            </div>
            <Link to="/create"><button className="Login-create-div"><p1>Create an account</p1></button></Link>
        </div>
    </div>
  );
}

export default LoginPage;