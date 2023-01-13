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

  const todoCollectionRef = collection(db,"todos");
  async function getTodo(){
    try {
      const docSnap = await getDoc(todoCollectionRef)
      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      
    }catch (e) {
      console.error("Error adding document: ", e);
    }
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
    getMovies();
    if (sessionStorage.length === 0) {
      console.log(sessionStorage.length);
      navigate('/');
    }

    return () => {};
  }, []);

  
  const nextId = useRef(0);
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
