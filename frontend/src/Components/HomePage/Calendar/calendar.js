import React, {useState, useEffect} from 'react'
import './calendarStyle.css'
import moment from 'moment'

import createCalendar from './createCalendar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

function Calendar() {

  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);
  const [clickedDay, setClickedDay] = useState(moment());
  const firstDay = value.clone().startOf("month")
  const lastDay = value.clone().endOf("month")

  //Dark mode css
  var dark = sessionStorage.getItem('darkmode')
  
  useEffect(() =>{
    setCalendar(createCalendar(value));
  }, [value])

  const clickDay = (day) =>{
    if (!firstDay.isAfter(day) && !lastDay.isBefore(day)){
      setClickedDay(day)
    }
  }

  const prevMonth = () => {
    setValue(value.clone().subtract(1, "month"))
  }

  const nextMonth = () => {
    setValue(value.clone().add(1, "month"))
  }

  return (
    <div className="calendar-box">
      <div className={dark === 'true' ? 'dark-month-selector' : "month-selector"}>
        <FontAwesomeIcon icon={faChevronLeft} onClick={() =>prevMonth()}/>
        {value.format("MMMM")}&nbsp;&nbsp;{value.format("YYYY")}
        <FontAwesomeIcon icon={faChevronRight} onClick={() =>nextMonth()}/>
      </div>
       {calendar.map((week) => (
         <div>
           {week.map((day) => (
             <div className={!firstDay.isAfter(day) && !lastDay.isBefore(day) && dark ==='true'? "dark-day": 
             !firstDay.isAfter(day) && !lastDay.isBefore(day) ? 'day': dark==='true' ? 'dark-diffMonthDay': 'diffMonthDay'} onClick={() => clickDay(day)}>
               <div className={clickedDay.isSame(day, "day") && value.format('M') === day.format('M') ? "selected": ""}>
               {day.format("D")}</div>
               </div>
           ))}
         </div>
       ))}
    </div>
  );
}

export default Calendar;