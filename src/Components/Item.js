import React from 'react';
import { BiCircle, BiCheckCircle, BiMinusCircle} from 'react-icons/bi'
import './Item.scss'
import cn from 'classnames';//조건부 스타일링을 위해 classnames 사용. 
import { IoMdCheckboxOutline } from 'react-icons/io';
const Item = ({todo, onRemove, onDone}) => {
    const { taskid, task, isCompleted } = todo;
    console.log(task)
    return(
        <div className='div-Item'>
            <div className={cn('div-checkbox',{ isCompleted })}
                onClick={() => onDone(taskid)}>
                {isCompleted ? <BiCheckCircle /> : <BiCircle />}
                
                <div className='div-text'>{task}</div>
            </div>
            <div className='remove' onClick={() => onRemove(taskid)} >  
                <BiMinusCircle/>
            </div>
        </div>
    );
};

export default React.memo(Item);