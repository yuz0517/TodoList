import React, { Component, useContext } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";//파베
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { auth } from "../../firebase";//파베
import { getAuth } from "firebase/auth";
import { toast , ToastContainer} from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/icon_1.png';
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
            let errorCode = error.code;// error.code 이거로 해야 토스트가 뜸. 
            //let errorMessage = error.message; //error메세지로 하면 안 뜸. 
            console.log(errorCode);
            if (errorCode === "auth/wrong-password") {
                toast.error("잘못된 비밀번호입니다. 다시 입력 해 주세요.", { position: "top-center", });
            } else if (errorCode === "auth/user-not-found") {
                toast.error("가입되지 않은 이메일입니다. 이메일을 다시 확인 해 주세요.", { position: "top-center", });
            } else if (errorCode === "auth/invalid-email") {
                toast.error("아이디를 이메일 형식으로 입력 해 주세요.", { position: "top-center", });
            }

        }
    }

    return (
        <div className='div-signin-all'>
                <div className='div-info' >
                    <p className='p-myowntodo'> My own daily To-do list, </p>
                    <img className='img-signin-icon'src={icon} width='40px' height='40px'></img>
                </div>
                <div className='div-login-title'>
                    <p className='p-login'>✧ LOGIN</p>
                </div>
                <div className='div-signin-form'>
                    <p className='p-id'>❇︎ID</p>
                    <input
                        className='input-signin-id'
                        placeholder='Email'
                        onChange={(e) => { setLoginEmail(e.target.value); }}
                    
                    />
                    <p className='p-password'>❇︎Password</p>
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
                <ToastContainer />
          
        </div>
    )
}

export default Signin;