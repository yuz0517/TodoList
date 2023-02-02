

import React, { useState } from 'react';
//import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.scss';
import './Calendar.scss'
function Calendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} className={'react-calendar'}    />
    </div>
  );
}
export default Calendar;


