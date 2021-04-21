import React, { useState, useEffect } from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import './App.css'
import CreatePage from './Components/CreatePage/createPage';
import LoginPage from './Components/LoginPage/loginPage';
import HomePage from './Components/HomePage/homePage';
import LobbyPage from './Components/LobbyPage/lobbyPage';
import CalendarCreatePage from './Components/CalendarCreatePage/calendarCreatePage';
import ProfilePage from './Components/ProfilePage/profilePage';
import logoutFunction from './Components/Logout/logoutFunction'

function App() {

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
            <Route path="/calendarCreate" exact component={CalendarCreatePage}/>
            <Route path="/profile" exact component={ProfilePage}/>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
