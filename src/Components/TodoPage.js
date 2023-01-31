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
    const datetime = new Date().getDate() ;
    const newtodos=((data.docs.map((doc) => ({...doc.data(), id:doc.id}))).map((v,index) => ({...v, taskid:index}))
    .filter(todo => (todo.useID) == sessionStorage.key(0)))//현재 로그인한 사용자별로 필터링.

    console.log(Date(newtodos[1].date.seconds).slice(4,15))

    var todayDate= (new Date()).toString().slice(4,15);
    //const newnewtodos = newtodos.filter(todo => (todo.date.seconds) >=  (new Date("01/31/2023").getTime()/1000)  )
    const newnewtodos = newtodos.filter(todo => (todo.date.seconds) >=  (((new Date().getMonth() + 1) + "/" + (new Date().getDate()) +"/"+(new Date().getFullYear())).getTime()/1000)  )
    //console.log(newDate)
    //const newtodos = todos.filter((todo) => Date(todo.date.seconds).toString().includes("Jan 31"))
   // console.log("todos",newtodos);
    // setTodos((data.docs.map((doc) => ({...doc.data(), id:doc.id}))).map((v,index) => ({...v, taskid:index})).filter(
    //    todo => (todo.date).toString().slice(4,11) !==   (todaysDate)));
    //console.log(Date(todos[5].date.seconds).toString().slice(4,15))
    //console.log(todos.filter(todo => Date(todo.date.seconds).toString().slice(4,15) === (todaysDate)))
    
    //setTodos(todos.filter((todo) => Date(todo.date.seconds).toString().includes(todaysDate)))
    

    console.log(todos)
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
  //const newtodos = todos.filter((todo) => Date(todo.date.seconds).toString().includes("Jan 29"))
  //const newtodos = todos.filter((todo) => Date(todo.task).includes("1월"))


  //console.log("includes",todos.filter((todo) => (todo.task).includes("1월"))) //정상적으로 표시
  //console.log("includes",todos.filter((todo) => (Date(todo.date.seconds).slice(4,15)).toLowerCase().includes('Jan 31'))) //정상적으로 표시
  //console.log(todaysDate.includes("Jan"))
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
