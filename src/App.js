//import icon_1 from './icon_1.png';
import './App.css';
import Template from './Components/Template'
import InputList from './Components/InputList'
import Item from './Components/Item'
import List from './Components/List'
import Signin from './Components/Login/Signin'
import Signup from './Components/Login/Signup'
import { useState } from 'react';
import TodoPage from './Components/TodoPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
const App = () => {
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
  return( 
<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin />}/>
        <Route path='/todo' element={<TodoPage />}/>
        <Route path='/Signup' element={<Signup />}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
};

export default App;
