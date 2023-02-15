import React, { useState, useCallback , useEffect} from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import Pasttodos from './Pasttodos';
import Slider from './Slider';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoMdRefresh } from 'react-icons/io';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

//import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
const TodoCalendar = ({ usertodos, getTodos }) => {
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
  const [selectdate, setselectdate] = useState(0);
  //console.log("todocalendar.js success",usertodos)
  //console.log(value);
  const [visible, setVisible] = useState(false);
  const [recordvisible, setrecordVisible] = useState(false);
  // const handleCloseChange = (e) => {
  //   setVisible(!visible);
  // }
  function Stateupdate() {
    //const Stateupdate  = () => {
    const [, updateState] = useState();
    const forUpdate = useCallback(() => updateState({}), []);
  }
  const handleDateChange = (value) => {
    console.log(value);
    onChange(value);
    setselectdate( moment(value).format('MM/DD/YYYY'));
    
    //console.log(isalldone);
    //console.log('selecttodos ,', selecttodos, visible);
  };

  useEffect(() => {
    const selectdate_seconds = new Date(selectdate).getTime() / 1000;
    //console.log(selectdate_seconds);
    //console.log(`The selected Date is ${value.toDateString()}`);

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
  },[value]) //usestate: []안의 state가 변경되면 이 코드 실행해주세요!

  return (
    <div className="div-todocalendar-full">
      <div className="div-past">
        <div>✶ My Journals ✶</div>

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
              <IoMdRefresh
                className="icon-reload"
                onClick={() => {
                  //window.location.reload()
                  
                  // useEffect(() => {
                   onChange(new Date());
                   getTodos();
                  // const selectdate = moment(value).format('MM/DD/YYYY');
                  // const selectdate_seconds =
                  //   new Date(selectdate).getTime() / 1000;
                  // //console.log(selectdate_seconds);
                  // //console.log(`The selected Date is ${value.toDateString()}`);

                  // const selecttodos = usertodos.filter(
                  //   (todo) =>
                  //     selectdate_seconds <= todo.date.seconds &&
                  //     selectdate_seconds + 86400 >= todo.date.seconds,
                  // );

                  // let isalldone = selecttodos.every(
                  //   (todo, index, selecttodos) => todo.isCompleted === true,
                  // );
                  // if (selecttodos.length === 0) isalldone = false;
                  // //setselecteddate(selectdate)
                  // setselectedtodos(selecttodos);
                  // setalldone(isalldone);

                  // //console.log(isalldone);
                  // console.log('selecttodos ,', selecttodos, visible);

                  // },[]);
                }}
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
