import React, { useState } from 'react'
import './Template.scss'
import moment from "moment"
import { useInterval } from "react-use";//seconds의 시,분, 초 값을 1초 단위로 업데이트 

const Template = ({ children }) => {
   
    const day = new Date(moment().format('YYYY-MM-DD')).getDay();
    return (
        <div className='div-template'>
            <div className='div-template-title'>
                Just Do It!
               
            </div>
            <div className='div-template-content'>{children}</div>
        </div>
    );
};

export default Template;