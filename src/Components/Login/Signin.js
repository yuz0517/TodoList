import React, { Component, useContext } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";//파베
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { auth } from "../../firebase";//파베
import { getAuth } from "firebase/auth";
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Signin.css'
//sign in 

//
const Signin = () => {

    const [Email, setLoginEmail] = useState("");
    const [Password, setLoginPassword] = useState("");
    const navigate = useNavigate();
    
    
    useEffect(() => {
        if (sessionStorage.length===1){
            console.log(sessionStorage.getItem(0))
            navigate  ("/todo");

        }
    
      return () => {
        
      }
    }, [])
    
    
    const login = async () => {
        
        try {
            const user = await signInWithEmailAndPassword(
                auth, Email, Password
            );
            sessionStorage.setItem(user.user.email, user.user.accessToken);
            navigate('/todo');

        } catch (error) {
            console.log(error.message);

        }
    }

    return (
        <>
            <div className='div-all'>
                <div className='div-title'>
                    <p className='p-login'>로그인</p>
                </div>
                <div>
                    <p className='p-id'>아이디 ( 이메일 형식 )</p>
                    <input
                        className='input-signin-id'
                        placeholder='Email'
                        onChange={(e) => { setLoginEmail(e.target.value); }}
                    
                    />
                    <p className='p-password'>비밀번호</p>
                    <input
                        className='input-signin-password'
                        placeholder="Password"
                        type='password'
                        onChange={(e) => { setLoginPassword(e.target.value); }}
                       
                    />
                </div>
                <div className='div-signin-button'>
                    <button
                        className='button-signin'
                        onClick={()=>{login() }}>Sign In</button>


                    <Link to="/SignUp">
                        <button className='button-signup'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Signin;