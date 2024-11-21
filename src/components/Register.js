import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/register.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { ApiUrlContext } from '../context/ApiUrlContext';


const Register = () => {
    const apiUrl  = useContext(ApiUrlContext);
    const { userInfo, setUserInfo } = useContext(UserContext);

    const [valid, setValid] = useState('');
    const [name, setName] = useState();
    const [last_name, setLast_name] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [textColor, setTextColor] = useState(true);
    

    const navigate = useNavigate();
    const [signError, setSignError] = useState(null);

    useEffect(() => {
        if (password === confirm_password) {
            return setValid('La contraseña coincide');

        } else {
            return (setValid('La contraseña no coincide'), setTextColor(false));
        };
    }, [password, confirm_password]);

    const handleSubmit = (e) => {
        if (password !== confirm_password) {
            e.preventDefault();
            alert('Las Contraseñas no coinciden');
        } else {
            e.preventDefault();
            axios.post(`${apiUrl}/adminApi/create-user`, {name, last_name, email, password, confirm_password, gender})
            .then(user => {
                setUserInfo({user});
                localStorage.setItem('token', user.data.token);
                console.log(user)

                navigate('/rewards');
            })
            .catch(err => {
                if (err.response.data.errors) {
                        setSignError(err.response.data.errors);
                        console.log(signError);
                    } else {
                        setSignError('Something went wrong in the server');
                    }});
        }
    }
  return (
    <div className='registerContainer'>
        <div className="formContainer">
            <h2>Registrate para obtener recompensas</h2>
            <form onSubmit={handleSubmit} className='registerForm'>
                <label htmlFor="name">Nombre</label>
                <input type="text" id='name' name='name' onChange={(e) => setName(e.target.value)} required/>
                <label htmlFor="lastName">Apellido</label>
                <input type="text" id='lastName' name='lastName' onChange={(e) => setLast_name(e.target.value)} required/>
                <label htmlFor="email">E-mail</label>
                <input type="text" id='email' name='email' onChange={(e) => setEmail(e.target.value)} required/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id='password' name='password' minLength='6' onChange={(e) => setPassword(e.target.value)} required/>
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input type="password" id='cp' name='confirm_password' minLength='6' onChange={(e) => setConfirmPassword(e.target.value)} required/>
                <fieldset>
                    <legend>Genero</legend>
                    <div>
                        <label htmlFor="sex">Masculino</label>
                        <input type='radio' id='sex' name='gender' onChange={(e) => setGender(e.target.value)} value='male'/>
                    </div>
                    <div>
                        <label htmlFor="sex">Femenino</label>
                        <input type='radio' id='sex' name='gender' value='female' onChange={(e) => setGender(e.target.value)}/>
                    </div>
                </fieldset>
                <button className='logBtn'>Enviar</button>
            </form>
            {signError && signError.map(err => <li>{err.msg}</li>)}
        </div>
    </div>
  )
}

export default Register
