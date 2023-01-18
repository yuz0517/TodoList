import React, { useEffect, useState, useRef, useCallback } from 'react';
import Template from './Template';
import InputList from './InputList';
import Logout from './Login/Logout';
import List from './List';
import { db } from './../firebase.js'
import { collection, getDocs, getDoc } from 'firebase/firestore'
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
      text: '',
      checked: false,
    }
  ]);
  const todoCollectionRef = collection(db,"todos");
  const getTodos = async () => {
    const data = await getDocs(todoCollectionRef);
    console.log(data.docs.map((doc) => ({...doc.data(), id:doc.id}))  );
    //setTodos(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    const defaultdatalength = (data.docs.map((doc) => ({...doc.data(), id:doc.id}))).length;
    setTasks((data.docs.map((doc) => ({...doc.data(), id:doc.id}))))
    setTodos((data.docs.map((doc) => ({...doc.data(), id:doc.id}))).map((v,index) => ({...v, taskid:index})),false);
    // for (var i = 0; i <defaultdatalength; i++){
    //   tasks[i].taskid.push(i);
    // }
    //console.log((data.docs.map((doc) => ({...doc.data(), id:doc.id})))[0].task)
    //(data.docs.map((doc) => ({...doc.data(), id:doc.id}))).map((v) => (false )

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
  
  const nextId = useRef(0);//바꿔주기
  const onDone = useCallback(
    (id) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, checked: !task.checked } : task,
        ),
      );
    },
    [tasks],
  );
  const onRemove = useCallback(
    (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks],
  );

  const onInsert = useCallback(
    (text) => {
      const task = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTasks(tasks.concat(task)); //Tasks 배열 뒤에 연결.
      nextId.current += 1;
    },
    [tasks],
  );

  return (
    <div>
      <Logout />
      <Template>
        <InputList onInsert={onInsert}></InputList>
        {/* oninsert함수 자체를 InputList로 전달하는 코드 */}
        <List tasks={tasks} onRemove={onRemove} onDone={onDone} />{' '}
        {/*props로 전달 */}
      </Template>
    </div>
  );
};

export default TodoPage;
