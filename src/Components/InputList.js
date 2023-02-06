import { collection, getDocs, getFirestore, addDoc,  Firestore, Timestamp, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from "../firebase"
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import './InputList.scss';
import { FirebaseError } from 'firebase/app';
const InputList = ({ onInsert }) => {
  const [Input, setInput] = useState('');
  const onInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const user = sessionStorage.key(0)// 이메일

   const [todos, setTodos] = useState([]);
   const todoCollectionRef = collection(db,"todos");
  // const getTodos = async () => {
  // //   const data = await getDocs(todoCollectionRef);
  // //   setTodos(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
  // // }
  // useEffect(() => {
    
  //   getTodos();

  // }, []);

  //console.log(todos);
  // async function getTodo(){ //오류낫음
  //   try {
  //     const docSnap = await getDoc(CollectionRef)
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
      
  //   }catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }
  async function addTodo(){
    try {
    
      const docRef = await addDoc(todoCollectionRef, {
        date: serverTimestamp(),
        isCompleted: false,
        task: Input,
        useID: user,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const onTaskSubmit = useCallback(
    (e) => {
      
      addTodo();
      onInsert(Input); //현재 Input값을 props로 받아온 onInsert함수에 넣어서 호출함.
      setInput(''); //위에서 값을 배열에 넣어줬으니 Input값을 초기화시켜줌!
      e.preventDefault(); //이 코드는 submit이벤트가 브라우저에서 새로고침을 유발하기 때문에 방지하기 위해 호출한 함수임.
    },
    [onInsert, Input],
  );
  return (
    <form className="InputList" onSubmit={onTaskSubmit}>
      {/* onSubmit으로 처리한 이유는 사실 밑의 button-task-add 에 onclick을 사용할 수 있었는데,
        onSubmit으로 처리하면 이 곳에서 엔터가 눌렸을 경우 이 이벤트가 발생하기 때문에  */}
      <input
        className="input-task"
        placeholder="✨ Please enter your schedule ✨"
        onChange={onInputChange}
        value={Input}
      />
      <button className="button-task-add">
        <IoIosAdd />
      </button>
      <div>
  

    </div>
    </form>

  );
};

export default InputList;
