import React from 'react'
import './homePage.css'

import Calendar from './Calendar/calendar'

function HomePage() {
  return (
    <div className="Home-container">
        <h1 className="Home-title">Calendarify.</h1>
        <div className="Home-content-container">
          <div className="Calendar-container">
            <Calendar/>
          </div>
          <div className="Social-container">
            <h1>Social and Dms go here</h1>
          </div>
        </div>
    </div>
  );
}

export default HomePage;