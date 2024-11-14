import { useContext } from 'react';
import { useState } from 'react';
import { ErrorContext } from '../context/ErrorContext';
import './styles/serverError.css';
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const { error } = useContext(ErrorContext);

  return (
    <div className='errorContainer'>
      <h1>Inicia sesion para comprar</h1>
      <Link to='/logIn'>Iniciar sesion</Link>
    </div>
  )
}

export default ErrorPage;
