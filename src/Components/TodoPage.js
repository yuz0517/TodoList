import React, { useEffect, useState } from 'react';
import Template from './Template';
import InputList from './InputList';
import Logout from './Login/Logout';
import List from './List';
import { useNavigate } from 'react-router-dom';


const TodoPage = () =>  {
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.length===0){
            console.log(sessionStorage.length)
            navigate  ("/");
        }
    
      return () => {
        
      }
    }, [])
    const [tasks, setTasks] = useState([
        {
          id: 1,
          text: '리액트의 기초 알아보기',
          checked: true,
        },
        {
          id: 2,
          text: '컴포넌트 스타일링 해 보기',
          checked: true,
        },
        {
          id: 3,
          text: '앱 만들어ㄱ보기',
          checked: false,
        },    
      ]);
    

  return (
    <div>
       <Logout/>
      <Template>
      <InputList>
        
      </InputList>
        <List tasks={tasks} /> {/*props로 전달 */}
        
      </Template>
      
    </div>
  );
}

export default TodoPage;