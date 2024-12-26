import React from 'react';
import './styles/storeStatus.css';
import { useContext } from 'react';
import { OpenContext } from '../context/OpenContext';

const StoreStatus = () => {

  const { storeStatus, setStoreStatus } = useContext(OpenContext);
  
  const statusHandler = () => {
    setStoreStatus(null);
  }
  return (
    <div className='statusContainer'>
        <div className='storeTextContainer'>
            <h1>El horario para ordenar es 6:00pm a 12:00am</h1> <p>No podras agregar platillos al carrito de compras fuera de ese horario.</p>
            <button className='cta' onClick={() => statusHandler()}>Aceptar</button>
      </div>
    </div>
  )
}

export default StoreStatus;
