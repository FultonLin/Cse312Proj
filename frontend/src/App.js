import React, { useState, useEffect } from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import './App.css'
import CreatePage from './Components/CreatePage/createPage';
import LoginPage from './Components/LoginPage/loginPage';
import HomePage from './Components/HomePage/homePage';
import LobbyPage from './Components/LobbyPage/lobbyPage';

function App() {
  // const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   fetch('/app/time').then(response => response.json()).then(data => {
  //     setCurrentTime(data.time)
  //   })
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/create" exact component={CreatePage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/home" exact component={HomePage}/>
            <Route path="/lobby" exact component={LobbyPage}/>
            <Route path="/" exact component={HomePage}/>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
