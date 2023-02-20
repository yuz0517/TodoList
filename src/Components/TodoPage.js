import React, { useEffect, useState, useRef, useCallback } from 'react';
import Template from './Template';
import InputList from './InputList';
import Logout from './Login/Logout';
import TodoCalendar from './TodoCalendar';
import List from './List';
import Slider from './Slider';
import { db } from './../firebase.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TodoPage.scss';
import icon from '../assets/icon_1.png';
import {
  collection,
  getDocs,
  getDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Copyright from './Copyright';

const TodoPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: '',
      text: '',
      checked: false,
    },
  ]);

  const [todos, setTodos] = useState([
    {
      taskid: '',
      date: { nanoseconds: '', seconds: '' },
      task: '',
      useID: '',
      isCompleted: false,
    },
  ]);

  const [usertodos, setuserTodos] = useState([
    {
      taskid: '',
      date: { nanoseconds: '', seconds: '' },
      task: '',
      useID: '',
      isCompleted: false,
    },
  ]);

  const todoCollectionRef = collection(db, 'todos');
  var todaysDate = new Date().toString().slice(4, 15);

  var length = 0;
  const getTodos = async () => {
    const data = await getDocs(todoCollectionRef);

    const defaultdatalength = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })).length; //firestore로 불러온 데이터의 길이
    length = defaultdatalength;
    const datetime = new Date().getDate();
    const firestoretodos = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .map((v, index) => ({ ...v, taskid: index }))
      .filter((todo) => todo.useID == sessionStorage.key(0)); //현재 로그인한 사용자별로 필터링.
    setuserTodos(firestoretodos);
    //console.log(Date(firestoretodos[1].date.seconds).slice(4, 15));

    let todaydate =
      new Date().getMonth() +
      1 +
      '/' +
      new Date().getDate() +
      '/' +
      new Date().getFullYear();
    todaydate = new Date(todaydate).getTime() / 1000;
    const newtodos = firestoretodos.filter(
      (todo) => todo.date.seconds >= todaydate,
    );
    setTodos(newtodos);

    const schedule = require('node-schedule');
    // const j = schedule.scheduleJob('10 * * * * *, function() {
    //   console.log("매 10초마다 실행");
    // });
    //var j = schedule.scheduleJob(' ? * 0-6', function(){
    //const schedule = require('node-schedule');
    var scheduleRemain = schedule.scheduleJob('3600 * * * * *', function () {
      //한 시간마다 한 번씩 실행.
      const remaintime = 24 - Number(new Date().getHours());
      toast.dark(
        '내일까지 ' +
          remaintime +
          '시간 남았습니다! 오늘 계획한 일들을 모두 끝내봅시다! 화이팅 💪',
        {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 7000,
          hideProgressBar: false,
        },
      );
      //console.log('1시간마다 실행');
    });
    var scheduleF5 = schedule.scheduleJob('3600 * * * * *', function () {
      //한 시간마다 한 번씩 실행.
      const remaintime = 24 - Number(new Date().getHours());
      toast.dark(
        '내일까지 ' +
          remaintime +
          '시간 남았습니다! 오늘 계획한 일들을 모두 끝내봅시다! 화이팅 💪',
        {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 7000,
          hideProgressBar: false,
        },
      );
      //console.log('1시간마다 실행');
    });
  };

  function getMovies() {
    const getDB = collection(db, 'todos');
    getDocs(getDB)
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => console.log(error.message));
  }

  const navigate = useNavigate();

  useEffect(() => {
    getTodos(); // firestore로부터 온 데이터
    getMovies();

    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, checked: !task.checked } : task,
    //   ),

    if (sessionStorage.length === 0) {
      //console.log(sessionStorage.length);
      navigate('/');
    }
    return () => {};
  }, []);

  //console.log(todos);

  const nextId = useRef(todos.length); //바꿔주기

  const updateTodos = async (updatetask) => {
    const todoCollectionRef = doc(db, 'todos', updatetask.id);
    if (updatetask.isCompleted === true) {
      await updateDoc(todoCollectionRef, {
        isCompleted: false,
      });
    } else if (updatetask.isCompleted === false) {
      await updateDoc(todoCollectionRef, {
        isCompleted: true,
      });
    }
  };
  const onDone = useCallback(
    (taskid) => {
      const updatetask = todos.find((todo) => todo.taskid === taskid);
      updateTodos(updatetask);
      setTodos(
        todos.map((todo) =>
          todo.taskid === taskid
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo,
        ),
      );
    },
    [todos],
  );
  const deleteTodos = async (deletetask) => {
    await deleteDoc(doc(db, 'todos', deletetask.id));
  };
  const onRemove = useCallback(
    (taskid) => {
      const deletetask = todos.find((todo) => todo.taskid === taskid);
      deleteTodos(deletetask);
      setTodos(todos.filter((todo) => todo.taskid !== taskid));
    },
    [todos],
  );

  console.log(
    '%c Do iT',
    'color: yellow; font-weight: bold; font-size: 30px; text-shadow: 0px 2px 2px blue, 0 4px 4px white',
  );

  const onInsert = useCallback(
    (task) => {
      const todo = {
        taskid: nextId.current,
        task,
        isCompleted: false,
      };
      setTodos(todos.concat(todo)); //Tasks 배열 뒤에 연결.
      nextId.current += 1;
    },
    [todos],
  );

  return (
    <div className="div-full">
      <Logout />

      <div className="div-logo-doit">
        <img src={icon} alt="logo" className="image-logo-doit" />
      </div>
      <Template>
        <InputList onInsert={onInsert}></InputList>
        {/* oninsert함수 자체를 InputList로 전달하는 코드 */}
        <List todos={todos} onRemove={onRemove} onDone={onDone} />{' '}
        {/*props로 전달 */}
      </Template>
      <TodoCalendar
        className="div-todocalendar"
        usertodos={usertodos}
        getTodos={getTodos}
        todos = {todos}
      />
      <ToastContainer />
      <Copyright />
    </div>
  );
};

export default TodoPage;
