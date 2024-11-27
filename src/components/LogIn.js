import React, { useContext, useState } from 'react';
import './styles/login.css';
import fb from '../assets/facebook(3).png';
import gg from '../assets/google.png';
import { ApiUrlContext } from '../context/ApiUrlContext';

const LogIn = () => {
    const apiUrl  = useContext(ApiUrlContext);
    
    /// GOOGLE STRATEGY ///
    const google = () => {
        window.location.href =`http://localhost:3200/api/auth/google`;
    }

    /// FACEBOOK STRATEGY ///
    const facebook = () => {
        window.location.href =`http://localhost:3200/api/auth/facebook`;
    }

  return (
    <div className='logInContainer'>
        <div className="bannerLog">
      </div>
        <div className='btnsContainer'>
        <div className='listContainer'>
            <h2>Entrar a mi Cuenta</h2>
            <ul>
                <li>Crea ordenes</li>
                <li>Recibe puntos de descuentos</li>
                <li>Recibe ofertas especiales</li>
            </ul>
        </div>
            <h3>Registrate o <br />Inicia sesion con tu<br />proveedor favorito</h3>
            <button className='google btns' onClick={google}><img src={gg} alt='google'/></button>
            <button className='fb btns' onClick={facebook}><img src={fb} alt="fb"/></button>
        </div>
    </div>
  )
}

export default LogIn;
