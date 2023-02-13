import React from 'react'
import icon from '../assets/icon_1.png';
import './Copyright.scss'
export default function Copyright() {
  return (
    <div className='div-bottom'> 
        <img className='image-icon-copyright' src={icon} width="30px" height="30px"/>
        <p className='p-copyright' fontSize="10px" >Copyright © YUZ . Powered by yuz0517yuz@gmail.com</p>
    </div>
  
  )
}
