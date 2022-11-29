import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr'
import './Logout.css'
const Logout = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        sessionStorage.clear();
        navigate('/')
    }
        
    return (
        <div className='div-logout-full'>
            <button className='button-logout' onClick={logout}>
            <GrLogout/>
            </button>
        </div>
    )

}

export default Logout;