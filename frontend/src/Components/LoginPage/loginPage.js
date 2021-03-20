import React, { useEffect, useState } from 'react'
import './loginPage.css'
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("Login Pressed")
    let data = {
      'username' : username,
      'password' : password
    }
    console.log(data)
    fetch('/app/login',{
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => console.log(response)) //handle the response from flask and give access or a response "please retype password"
  }

  const handleUsernameChange = (e) => {//set username when inputed
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {//set passsword when inputed
    setPassword(e.target.value)
  }

  return (
    <div className="Login-Container">
        <div className="Login-Bubble-Container">
            <h1>Welcome to Calendarify.</h1>
            <div className="Login-Bubble">
                <div className="Login-Text">
                    <h1>Login</h1>
                    <input type = "text" onChange={handleUsernameChange} value={username} className="Login-input" placeholder="Username"/>
                    <input type = "password" onChange={handlePasswordChange} value={password} className="Login-input" placeholder="Password" type="password"/>
                    <Link to="/lobby"><button className="Login-button">Log in</button></Link>
                </div>
            </div>
            <Link to="/create"><button className="Login-create-div"><p1>Create an account</p1></button></Link>
        </div>
    </div>
  );
}

export default LoginPage;