import React, { Component, useCallback } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";//파베
import { useState } from 'react';
import { auth } from "./../../firebase";//파베
import './Signup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import {useNavigate} from "useNavigate";
const Signup = () => {

   
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [PasswordCheck, setPasswordCheck] = useState("");
    const [isPasswordSame, setIsPasswordSame] = useState(false);
    const [isPasswordNull, setIsPasswordNull] = useState(false);
    const [Address, setAddress] = useState("");//daum 으로 검색한 주소는 여기에 담아줌. 

 
 


    /* firebase e-mail login */

    //const navigate = useNavigate();

    const [isEmail, setIsEmail] = useState(false);
    const onChangeID = useCallback(e => {
        var Checkemail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if (Checkemail.test(e.target.value) === true) {
            setIsEmail(true);
        } else setIsEmail(false);
    })
    const onChangePassword = useCallback(e => {
        //setRegisterPassword(e.target.value);  
        const regispw = e.target.value;
        setRegisterPassword(regispw);
        console.log("registerpassword", registerPassword)
        if (regispw === PasswordCheck && (regispw !== "" && PasswordCheck !== "")) {
            setIsPasswordSame(true)
        } else if (regispw === "" && PasswordCheck === "") {
            setIsPasswordNull(true)
        }
        else setIsPasswordSame(false)

    })
    const onChangePasswordSame = useCallback( //isPasswordSame을 t/f로 set해주는 함수. t/f여부에 따라서 jsx에서 password 입력 상태에 따라 나타나는 메세지가 다름. 
        e => {
            const pwcheck = e.target.value;
            console.log("", PasswordCheck)
            setPasswordCheck(pwcheck);
            if (pwcheck === registerPassword && (pwcheck !== "" && registerPassword !== "")) {
                setIsPasswordSame(true);
                //console.log(isPasswordSame, pwcheck,registerPassword);

            } else {
                setIsPasswordSame(false);
                //console.log(isPasswordSame, pwcheck,registerPassword);

            }

        });


    const register = async () => { //밑에서 회원가입 버튼 onclick에 할당한다. 
        try {

            const createdUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            //const errmsg = await setErrorMsg(errmsg);
            console.log(createdUser);
            //setRegisterEmail("");
            //setRegisterPassword("");
            toast.success(<h4>회원가입이 완료되었습니다.<br /> 로그인 해 주세요.</h4>, { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
            //setTimeout(()=> {
            //    navigate("/");
            //  }, 2000);

        } catch (error) {
            console.log(error.message);
            let errorCode = error.code;// errorcode 이거로 해야 토스트가 뜸. 
            //let errorMessage = error.message; //error메세지로 하면 안 뜸. 
            console.log(errorCode);
            if (errorCode === "auth/email-already-in-use") {
                toast.error(<h4>이미 가입되어 있는 계정입니다.</h4>, { position: "top-center", });
            } else if (errorCode === "auth/invalid-email") {
                toast.error(<h4>잘못된 이메일 주소입니다.</h4>, { position: "top-center", });
            } else if (errorCode === "auth/weak-password") {
                toast.error(<h4>비밀번호는 6자리 이상으로 설정해주시기 바랍니다.</h4>, { position: "top-center", });
            }


        }
    };
    return (
        <>

            <div className='div-all'>

                <div className='div-title'>

                    <p className='p-login'>회원가입</p>
                </div>
                <p className='p-id'>아이디 ( 이메일 형식으로 입력 해 주세요. )</p>
                <input
                    className='input-id'
                    placeholder='id ( email )'
                    type='text'
                    name='id'
                    onChange={(e) => { setRegisterEmail(e.target.value); onChangeID(e) }
                    } />
                <div className='div-checkid'>
                    {isEmail
                        ?
                        <p className='p-checkid-true'>올바른 이메일 형식입니다.</p>
                        : (registerEmail === ""
                            ? <p className='p-checkid-null'>이메일을 입력 해 주세요</p>
                            : <p className='p-checkid-false'>올바른 이메일 형식으로 입력 해 주세요.</p>)

                    }
                </div>


                <p className='p-password'>비밀번호</p>
                <input
                    type="password"
                    className='input-password'
                    placeholder="password: 6자리 이상으로 입력 해 주세요."
                    onChange={onChangePassword} />

                <p className='p-password'>비밀번호 확인</p>
                <input
                    type="password"
                    className='input-password-check'
                    placeholder="password를 한번 더 입력 해 주세요."
                    onChange={onChangePasswordSame}
                />
                <div className='div-passwordcheck'>
                    {isPasswordSame
                        ?
                        <p className='p-passwordcheck-true'> 정확한 비밀번호를 입력하셨습니다.</p>
                        : (registerPassword === "" && PasswordCheck === "" //===null 로 입력 시 이 조건문은 안 돌아감.
                            ? <p className='p-passwordcheck-null'>비밀번호를 입력 해 주세요</p>
                            : <p className='p-passwordcheck-false'>비밀번호가 틀립니다. 다시 입력 해 주세요.  </p>)



                    }
                </div>

                <div className='div-button'>
                    <button
                        className="button-register"
                        disabled={!(registerEmail && registerPassword  && isPasswordSame
                                    )}//해당 state의 내용이 없으면 disabled로 표시해주기.
                        onClick={() => { register(); }}>

                    </button>
                </div>
                <ToastContainer />

            </div>
        </>
    );
}

export default Signup