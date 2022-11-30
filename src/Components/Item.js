import React from 'react';
import { BiCircle, BiCheckCircle, BiMinusCircle} from 'react-icons/bi'
import './Item.scss'
import cn from 'classnames'
import { IoMdCheckboxOutline } from 'react-icons/io';
const Item = (todo) => {
    const { text, checked } = todo;
    return(
        <div className='div-Item'>
            <div className={cn('div-checkbox',{ checked })}>
                {checked ? <BiCheckCircle /> : <BiCircle />}
                
                <div className='div-text'>할 일</div>
            </div>
            <div className='remove'>
                <BiMinusCircle/>
            </div>
        </div>
    );
};

export default Item;