import React, { useCallback, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import './InputList.scss';

const InputList = ({ onInsert }) => {
    const [Input, setInput] = useState("");
    const onInputChange = useCallback(e => {
        setInput(e.target.value);
    },[])

    const onTaskSubmit = useCallback(
        e => {
            onInsert(Input)//현재 Input값을 props로 받아온 onInsert함수에 넣어서 호출함.
            setInput("")//위에서 값을 배열에 넣어줬으니 Input값을 초기화시켜줌!
            e.preventDefault(); //이 코드는 submit이벤트가 브라우저에서 새로고침을 유발하기 때문에 방지하기 위해 호출한 함수임.
        }
    )
  return (
    <form className="InputList" onSubmit={onTaskSubmit}>
        {/* onSubmit으로 처리한 이유는 사실 밑의 button-task-add 에 onclick을 사용할 수 있었는데,
        onSubmit으로 처리하면 이 곳에서 엔터가 눌렸을 경우 이 이벤트가 발생하기 때문에  */}
      <input
        className="input-task"
        placeholder="🍀일정을 입력하세요"
        onChange={onInputChange}
        
      />
      <button className="button-task-add">
        <IoIosAdd />
      </button>
    </form>
  );
};

export default InputList;
