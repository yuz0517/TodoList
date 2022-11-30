import React from 'react';
import Item from './Item';
import './List.scss'
const List = ({ tasks }) => {
    console.log("list.js",tasks)
    return(
        <div className='div-List'>
            {tasks.map(task => (
                <Item task={task} key={task.id} 
                />
            ))}
        </div>
    )
}

export default List; 