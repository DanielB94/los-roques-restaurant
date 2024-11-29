import axios from 'axios';
import React, { useState, useContext } from 'react';
import './styles/phoneModal.css';
import { Placeholder } from 'phosphor-react';
import { UserContext } from '../context/UserContext';
import { ApiUrlContext } from '../context/ApiUrlContext';

const PhoneModal = (props) => {
    const { closeModal, phone, setPhone } = props;
    const apiUrl  = useContext(ApiUrlContext);
    const { userInfo, setUserInfo } = useContext(UserContext);
    console.log(closeModal)
    
    /// KNOW IF THE USER IS AUTHENTICATED LOGIC ///
    let user;
    let user_id =userInfo.user.data.info._id
    
    const userHandler = (() => {
        if (userInfo) {
            return (user = userInfo.user.data.info, user_id = userInfo.user.data.info);
        } else {
            return user = null
        }
        })
        
        const phoneHandler = (e) => {
            e.preventDefault()
            axios.post(`${apiUrl}/api/phoneNumber`, {user_id, phone}, {withCredentials: true})
            .then(user => {
                if(user) {
                    closeModal();
                    console.log(user)
                }
            })
            .catch(err => console.log(err));
        }
            
            
            return (
                <div className='phoneContainer'>
        <div className='phoneModal'>
      <p>Necesitamos tu numero de telefono<br />para avisarte el status de tu orden</p>
      <form onSubmit={phoneHandler} className='phoneForm'>
        <input type='tel' name="phone" onChange={(e) => setPhone(e.target.value)} placeholder='(000) 000-0000' required/>
        <button className='cta'>Agregar</button>
      </form>
      </div>
    </div>
  )
};

export default PhoneModal;
