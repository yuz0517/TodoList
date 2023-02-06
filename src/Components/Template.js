import React, { useState } from 'react'
import './Template.scss'
import moment from "moment"
import { useInterval } from "react-use";//seconds의 시,분, 초 값을 1초 단위로 업데이트 
//https://velog.io/@jinyoung234/React-%ED%8A%B9%EC%A0%95-%EC%8B%9C%EA%B0%84%EC%9D%B4-%EB%90%A0-%EA%B2%BD%EC%9A%B0-state-%EC%B4%88%EA%B8%B0%ED%99%94-%EB%A1%9C%EC%A7%81-%EA%B5%AC%ED%98%84moment.js-useInterval-useEffect
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