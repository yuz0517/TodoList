import React from 'react';
import Item from './Item';
import './List.scss'
const List = ({ todos, onRemove, onDone }) => {
    console.log("list.js",todos)
    return(
        <div className='div-List'>
            {todos.map(todo => (
                <Item todo={todo} key={todo.taskid} onRemove={onRemove} onDone={onDone} 
                />
            ))}
        </div>
    )
}

export default List; 