import React from 'react'
import './loginPage.css'

function LoginPage() {
  return (
    <div className="Login-Container">
        <div className="Login-Bubble-Container">
            <h1>Welcome to Calendarify.</h1>
            <div className="Login-Bubble">
                <div className="Login-Text">
                    <h1>Login</h1>
                    <input className="Login-input" placeholder="Username"></input>
                    <input className="Login-input" placeholder="Password"></input>
                    <button className="Login-button">Log in</button>
                </div>
            </div>
            <div className="Login-create-div"><p1>Create an account</p1></div>
        </div>
    </div>
  );
}

export default LoginPage;