import React, { useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import Pasttodos from './Pasttodos';
import Slider from './Slider';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
//import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
const TodoCalendar = ({ usertodos }) => {
  // 조건부 렌더링
  // const Closeicon = () => {

  //    return(
  //       <div>
  //          <IoCloseCircleOutline/>
  //       </div>
  //    )
  //}
  //let alldone, selectedtodos;
  const [value, onChange] = useState(new Date());
  //const [selecteddate,setselecteddate] = useState('');
  const [alldone, setalldone] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [selectedtodos, setselectedtodos] = useState(0);
  //console.log("todocalendar.js success",usertodos)
  //console.log(value);
  const [visible, setVisible] = useState(false);
  const [recordvisible, setrecordVisible] = useState(false);
  // const handleCloseChange = (e) => {
  //   setVisible(!visible);
  // }
  const handleDateChange = (value) => {
    onChange(value);
    const selectdate = moment(value).format('MM/DD/YYYY');
    const selectdate_seconds = new Date(selectdate).getTime() / 1000;
    console.log(selectdate_seconds);
    console.log(`The selected Date is ${value.toDateString()}`);

    const selecttodos = usertodos.filter(
      (todo) =>
        selectdate_seconds <= todo.date.seconds &&
        selectdate_seconds + 86400 >= todo.date.seconds,
    );

    let isalldone = selecttodos.every(
      (todo, index, selecttodos) => todo.isCompleted === true,
    );
    if (selecttodos.length === 0) isalldone = false;
    //setselecteddate(selectdate)
    setselectedtodos(selecttodos);
    setalldone(isalldone);
    setVisible(true);
    setrecordVisible(true);
    console.log(isalldone);
    console.log('selecttodos ,', selecttodos, visible);
  };
  return (
    <div className="div-todocalendar-full">
      
      <div className="div-past">
        <div>✶ 나의 지난 기록들 ✶</div>

        {recordvisible ? (
          <BsToggleOn
            className="icon-toggle"
            onClick={() => {
              setrecordVisible(!recordvisible);
            }}
          />
        ) : (
          <BsToggleOff
            className="icon-toggle"
            onClick={() => {
              setrecordVisible(!recordvisible);
            }}
          />
        )}
        {recordvisible && (
          <>
            <div className="div-calendar">
              <Calendar
                onChange={handleDateChange}
                value={value}
                className={'react-calendar'}
                locale="en-EN"

                //formatDay={(locale, date) => moment(date).format("DD")}
              />
            </div>
            <div className="div-calendar-todo">
              {visible && (
                <IoCloseCircleOutline
                  className="icon-close"
                  onClick={() => {
                    setVisible(!visible);
                  }}
                />
              )}
              {visible && (
                <Pasttodos
                  selecteddate={value}
                  selecttodos={selectedtodos}
                  isalldone={alldone}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default TodoCalendar;
