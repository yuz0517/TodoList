import React from 'react';
import Item from './Item';
import './List.scss'
const List = ({ tasks, onRemove, onDone }) => {
    console.log("list.js",tasks)
    return(
        <div className='div-List'>
            {tasks.map(task => (
                <Item task={task} key={task.id} onRemove={onRemove} onDone={onDone} 
                />
            ))}
        </div>
    )
}

export default List; 