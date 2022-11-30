import React from 'react';
import { BiCircle, BiCheckCircle, BiMinusCircle} from 'react-icons/bi'
import './Item.scss'
import cn from 'classnames';//조건부 스타일링을 위해 classnames 사용. 
import { IoMdCheckboxOutline } from 'react-icons/io';
const Item = ({task}) => {
    const { text, checked } = task;
    console.log(text)
    return(
        <div className='div-Item'>
            <div className={cn('div-checkbox',{ checked })}>
                {checked ? <BiCheckCircle /> : <BiCircle />}
                
                <div className='div-text'>{text}</div>
            </div>
            <div className='remove'>
                <BiMinusCircle/>
            </div>
        </div>
    );
};

export default Item;