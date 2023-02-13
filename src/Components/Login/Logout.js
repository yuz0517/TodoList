import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi'
import './Logout.scss'
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
            
            <BiLogOut className = 'icon-logout-icon' onClick={logout} size='26'/>
           
        </div>
    )

}

export default Logout;