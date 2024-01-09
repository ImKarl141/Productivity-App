import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import './Calendar.css'


const CalendarMenu = () => {
  return (
    <section className='calendar-container'>
      <FullCalendar
        plugins={[dayGridPlugin]}
      />
    </section>
  )
}
export default CalendarMenu