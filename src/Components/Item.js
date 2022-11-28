import React from 'react';
import { BiCircle, BiCheckCircle} from 'react-icons/bi'
const Item = () => {
    return(
        <div className='div-Item'>
            <div className='div-checkbox'>
                <BiCircle/>
                <div className='div-text'>할 일</div>
            </div>
            <div className='remove'>
                <BiCheckCircle></BiCheckCircle>
            </div>
        </div>
    );
};

export default Item;