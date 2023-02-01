import React, { useEffect, useState, useRef, useCallback } from 'react';
import Template from './Template';
import InputList from './InputList';
import Logout from './Login/Logout';
import Calendar from 'react-calendar';
import List from './List';
import { db } from './../firebase.js';
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

    console.log(Date(firestoretodos[1].date.seconds).slice(4, 15));

    //var todayDate= (new Date()).toString().slice(4,15);
    //const newnewtodos = newtodos.filter(todo => (todo.date.seconds) >=  (new Date("01/31/2023").getTime()/1000)  )
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
    //console.log(newDate)
    //const newtodos = todos.filter((todo) => Date(todo.date.seconds).toString().includes("Jan 31"))
    // console.log("todos",newtodos);
    // setTodos((data.docs.map((doc) => ({...doc.data(), id:doc.id}))).map((v,index) => ({...v, taskid:index})).filter(
    //    todo => (todo.date).toString().slice(4,11) !==   (todaysDate)));
    //console.log(Date(todos[5].date.seconds).toString().slice(4,15))
    //console.log(todos.filter(todo => Date(todo.date.seconds).toString().slice(4,15) === (todaysDate)))

    //setTodos(todos.filter((todo) => Date(todo.date.seconds).toString().includes(todaysDate)))

    console.log(todos);
  };

  function getMovies() {
    const getDB = collection(db, 'todos');
    getDocs(getDB)
      .then((response) => {
        console.log(response);
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
      console.log(sessionStorage.length);
      navigate('/');
    }
    return () => {};
  }, []);

  console.log(todos);

  const nextId = useRef(todos.length); //바꿔주기

  const updateTodos = async (updatetask) => {
    const todoCollectionRef = doc(db, 'todos', updatetask.id);
    if (updatetask.isCompleted === true) {
      await updateDoc(todoCollectionRef, {
        isCompleted: false,
      });
    }else if (updatetask.isCompleted === false) {
      await updateDoc(todoCollectionRef, {
        isCompleted: true,
      })
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
    <div>
      <Calendar />
      <Logout />
      <Template>
        <InputList onInsert={onInsert}></InputList>
        {/* oninsert함수 자체를 InputList로 전달하는 코드 */}
        <List todos={todos} onRemove={onRemove} onDone={onDone} />{' '}
        {/*props로 전달 */}
      </Template>
    </div>
  );
};

export default TodoPage;
