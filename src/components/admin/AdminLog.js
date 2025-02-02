import React, { useContext, useEffect, useState } from 'react';
import '../styles/login.css';
import fb from '../../assets/facebook.png';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { socket } from '../../socket';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { AdminContext } from '../../context/AdminContext';

const AdminLog = () => {
    const apiUrl  = useContext(ApiUrlContext);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const {admin, setAdmin} = useContext(AdminContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    /// SUBMIT ADMIN HANDLER ///
    const submit = (e) => {
        e.preventDefault();
        axios.post(`${apiUrl}/adminApi/adminLog`, { email: email, password: password })
            .then((user) => {
                socket.connect();
                localStorage.setItem('token', user.data.jwt.token);
                setUserInfo({user});      
                setAdmin(true);  
                navigate(`/eljalabolas`);
                console.log(socket);
            })
            .catch(err => {
                if (err) {
                    setError(err);
                } else {
                    setError('Something went wrong in the server');
                }
            });
    }

  return (
    <div className='logInContainer'>
        <div className='container logIn'>
            <h2>Admin Log</h2>
            {error && <p className='error'>{error}</p>}
            <form method="post" className='loginForm'>
                <label htmlFor="email">Email*</label>
                <input type="text" id='email' onChange={(e) => {
                    setEmail(e.target.value);
                }} required/>
                <label htmlFor="password">Password*</label>
                <input type="password" id='password' onChange={(e) => {
                    setPassword(e.target.value);
                }} required minLength='8'/>
                <button className="submit logBtn" onClick={submit}>Iniciar sesion</button>
            </form>
            </div>
        </div>
  )
}

export default AdminLog;
