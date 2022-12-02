import React, { useEffect, useState, useRef, useCallback } from 'react';
import Template from './Template';
import InputList from './InputList';
import Logout from './Login/Logout';
import List from './List';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.length === 0) {
      console.log(sessionStorage.length);
      navigate('/');
    }

    return () => {};
  }, []);
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
  const nextId = useRef(4);
  const onDone = useCallback( id => 
    {setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, checked: !task.checked } : task
      ),
    );

  }, [tasks]);
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
        <List tasks={tasks} onRemove={onRemove} onDone={onDone} /> {/*props로 전달 */}
      </Template>
    </div>
  );
};

export default TodoPage;
