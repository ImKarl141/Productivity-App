import React from 'react';
import { sliceEvents, createPlugin } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './Calendar.css'


const CalendarMenu = () => {
  return (
    <section className='calendar-container'>
      <FullCalendar
        plugins={[dayGridPlugin]}
      />
      {/* <h2>Calendar</h2> */}
    </section>
  )
}
export default CalendarMenu