import React from 'react';
import { BiCircle, BiCheckCircle, BiMinusCircle} from 'react-icons/bi'
import './Item.scss'
import cn from 'classnames';//조건부 스타일링을 위해 classnames 사용. 
import { IoMdCheckboxOutline } from 'react-icons/io';
const Item = ({task, onRemove, onDone}) => {
    const { id, text, checked } = task;
    console.log(text)
    return(
        <div className='div-Item'>
            <div className={cn('div-checkbox',{ checked })}
                onClick={() => onDone(id)}>
                {checked ? <BiCheckCircle /> : <BiCircle />}
                
                <div className='div-text'>{text}</div>
            </div>
            <div className='remove' onClick={() => onRemove(id)} >  
                <BiMinusCircle/>
            </div>
        </div>
    );
};

export default React.memo(Item);