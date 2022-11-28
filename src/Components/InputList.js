import React from "react";
import { IoIosAdd } from 'react-icons/io' 
import './InputList.scss'

const InputList = () => {
    return (
        <form className="InputList" >
            <input className="input-task" placeholder="🍀일정을 입력하세요"/>
            <button className="button-task-add">
                <IoIosAdd/>
            </button>
        </form>
    );
};

export default InputList