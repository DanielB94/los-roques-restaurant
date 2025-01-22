import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../context/OrderContext';
import axios from 'axios';
import '../styles/admin.css';
import { useNavigate } from "react-router-dom";
import { MenuContext } from '../../context/MenuContext';
import { ErrorContext } from '../../context/ErrorContext';
import { socket } from '../../socket';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { AdminContext } from '../../context/AdminContext';
import { OpenContext } from '../../context/OpenContext';


const Admin = (props) => {
  const apiUrl  = useContext(ApiUrlContext);
  const [category, setCategory] = useContext(MenuContext);
  const {error, setError} = useContext(ErrorContext);
  const {admin, setAdmin} = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const [orderFromIo, setOrderFromIo] = useState([]);
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState('.red');
  const {storeStatus, setStoreStatus} = useContext(OpenContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    socket.connect();
    console.log(socket);
    
    socket.emit('joinRoom', 'AdminRoom');
    setAdmin(true);
    console.log(admin);
    
  }, []);

  useEffect(() => {

    if (socket.connected === true) {
      setStatus('green');
    } else {
      setStatus('red');
    }
  }, [socket]);
  
  useEffect(() => {
    
    
    socket.on('changes', (change) => {
      console.log(change);
      setOrderFromIo([...orderFromIo, change]);
      console.log(orderFromIo);
    });

  }, [orderFromIo]);

  /// FUNCTION TO POP A DONE ORDER FROM THE ARRAY ///
  const doneHandler = (id) => {
    axios.post(`${apiUrl}/adminApi/get-order`, {id}, {
      headers : {
        Authorization: `${localStorage.getItem('token')}`
      }
    })
    .then(result => {
      setValue(result._id);
      setOrderFromIo(orderFromIo.filter(item => item._id !== id));
    })
    .catch(err => navigate('/errorPage'));
  }
  
  /// FUNCTION TO GET ORDERS IN CASE SOMETHING GOES WRONG ///
  const backupHandler = () => {
    axios.get(`${apiUrl}/adminApi/get-order`, { headers: { Authorization: `${localStorage.getItem('token')}`}})
    .then(result => {
      if (result.data.length !== 0) {
      setOrderFromIo(result.data);
    }})
    .catch(err => console.log(err));
  }

  /// FUNCTION STORE HANDLER ///
  const storeHandler = () => {
    if (storeStatus) {
        setStoreStatus(false);
      } else {
        setStoreStatus(true);
    }
  };

  return (
    <div className='adminContainer'>
      <div className='status'>
        {storeHandler ? <button onClick={storeHandler}>open</button> : <button onClick={storeHandler}>closed</button>}
        {storeStatus ? <p>opened</p> : <p>closed</p>}
        <div className={status}></div>
        <button onClick={() => backupHandler()}>Ordenes</button>
      </div>
      <div className='adminOrdersContainer'>
        {orderFromIo.length === 0 ? null : orderFromIo.map(item => {
          return <div className='adminOrderCard'>
            <h1>{item.client_name}</h1>
            <p>{new Date(item.createdAt).toLocaleTimeString()}</p>
            <div className='cart'>
              {item.cart.map(i => {
                return <div className='item'>
                  <h3>{i.name}</h3>
                 <div className='modContainer'>
                  <ul>
                    {i.mods.map(mod =><li>{mod}</li>
                  )}
                  </ul>
                 </div>
                </div>
              })}
            </div>
            <button onClick={() => doneHandler(item._id)}>Listo</button>
          </div>
        })}
      </div>
    </div>
  )
}

export default Admin;

