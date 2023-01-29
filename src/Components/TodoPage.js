import React, { useEffect, useState, useRef, useCallback } from 'react';
import Template from './Template';
import InputList from './InputList';
import Logout from './Login/Logout';
import List from './List';
import { db } from './../firebase.js'
import { collection, getDocs, getDoc, Timestamp } from 'firebase/firestore'
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
      date: {nanoseconds: '', seconds:''},
      task: '',
      useID: '',
      isCompleted: false,
    }
  ]);
  const todoCollectionRef = collection(db,"todos");
  var todaysDate= (new Date()).toString().slice(4,15);
  
  var length = 0;
  const getTodos = async () => {
    const data = await getDocs(todoCollectionRef);
    //console.log(data.docs.map((doc) => ({...doc.data(), id:doc.id}))  );
    const defaultdatalength = (data.docs.map((doc) => ({...doc.data(), id:doc.id}))).length; //firestore로 불러온 데이터의 길이
    length = defaultdatalength;
    console.log(todaysDate);
    setTodos((data.docs.map((doc) => ({...doc.data(), id:doc.id}))).map((v,index) => ({...v, taskid:index})))
    // setTodos((data.docs.map((doc) => ({...doc.data(), id:doc.id}))).map((v,index) => ({...v, taskid:index})).filter(
    //    todo => (todo.date).toString().slice(4,11) !==   (todaysDate)));
    //console.log(Date(todos[5].date.seconds).toString().slice(4,15))
    //console.log(todos.filter(todo => Date(todo.date.seconds).toString().slice(4,15) === (todaysDate)))
    
    const result = (todos.filter((todo) => Date(todo.date.seconds).toString().includes(todaysDate)))
   

    console.log(result)
  }

  function getMovies() {
    const getDB = collection(db, 'todos');
    getDocs(getDB)
      .then(response => {
        console.log(response)

    })
    .catch(error => console.log(error.message));
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
  console.log(todos)
  
  
  const nextId = useRef(11);//바꿔주기
  const onDone = useCallback(
    (taskid) => {
      setTodos(
        todos.map((todo) =>
          todo.taskid === taskid ? { ...todo, isCompleted: !todo.isCompleted } : todo,
        ),
      );
    },
    [todos],
  );
  const onRemove = useCallback(
    (taskid) => {
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
