import React from 'react'
import cn from 'classnames';
import './PastItem.scss'
const PastItem = ({todo}) => {
    const { task, isCompleted } = todo;
   console.log(isCompleted);
  return (
    <div className={cn('div-past-todo',{ isCompleted })}>
       <div className='div-past-todo-text'> {task}</div>
    </div>
  )
}

export default PastItem;
