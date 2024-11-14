import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './styles/unauthorized.css';

const Unauthorized = () => {
  return (
    <div className='unauthorizedContainer'>
      <h1>Inicia sesion para entrar a tu perfil</h1>
      <Link to='/logIn'>Iniciar sesion</Link>
    </div>
  )
}

export default Unauthorized;
