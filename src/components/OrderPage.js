import React, { useContext, useEffect, useState } from 'react';
import './styles/orderPage.css';
import CardPage from './CardPage';
import axios from 'axios';
import { MenuContext } from '../context/MenuContext';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../context/ErrorContext';
import { ApiUrlContext } from '../context/ApiUrlContext';
import StoreStatus from './StoreStatus';
import { OpenContext } from '../context/OpenContext';

const OrderPage = (props) => {
  const  { handlerAddButton, cartItems, Item } = props;
  const apiUrl  = useContext(ApiUrlContext);
  const [category, setCategory] = useContext(MenuContext);
  const {error, setError} = useContext(ErrorContext);
  const { storeStatus, setStoreStatus } = useContext(OpenContext);
  const navigate = useNavigate();

/// SET IN THE CATEGORY STATE THE CATEGORY DESIRE ///
  const categoryHandler = (name) => {
    axios.post(`${apiUrl}/api/menu-item-category`, {category: name, available: true})
    .then((result) => setCategory(result.data))
    .catch(err => {
      setError(err);
      navigate('/ErrorPage');
    });
  }

/// REGISTER BTN HANDLER ///
  const registerBtn = () => {
    navigate('/login');
  };

  return (
    <div className='orderContainer'>
      {storeStatus === false ? <StoreStatus/> : null}
      <div className='orderBanner'>
        <h1>Suma recompensas <br /> por compra</h1>
        <button className="cta" onClick={registerBtn}>Registrate aqui</button>
      </div>
      <div className='productsNavbar'>
        <button className="orderCta" name='entries' onClick={(e) => categoryHandler(e.target.name)}>Entries</button>
        <button className="orderCta" name='hamburguer' onClick={(e) => categoryHandler(e.target.name)}>Hamburguers</button>
        <button className="orderCta" name='patacon' onClick={(e) => categoryHandler(e.target.name)}>Patacones</button>
        <button className="orderCta" name='arepas' onClick={(e) => categoryHandler(e.target.name)}>Arepas</button>
        <button className="orderCta" name='subways' onClick={(e) => categoryHandler(e.target.name)}>Subways - Hot dogs</button>
      </div>
      <div className='products'>
        <CardPage handlerAddButton={handlerAddButton} cartItems={cartItems}/>
      </div>
    </div>
  )
}

export default OrderPage;
