import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import axios from 'axios';
import './styles/admin.css';
import { useNavigate } from "react-router-dom";
import { MenuContext } from '../context/MenuContext';
import { ErrorContext } from '../context/ErrorContext';
import { socket } from '../socket';
import check from '../assets/check.png';
import remove from '../assets/remove.png';


const Admin = (props) => {
  const [category, setCategory] = useContext(MenuContext);
  const [orders, setOrders] = useState([]);
  const [orderFromIo, setOrderFromIo] = useState([]);
  const [value, setValue] = useState(null);
  const {error, setError} = useContext(ErrorContext);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    socket.connect();
  
    socket.emit('joinRoom', 'AdminRoom');

    socket.on('changes', (change) => {
      console.log(change);
      setOrderFromIo([...orderFromIo, change]);
      console.log(orderFromIo);
    });

    socket.on('menuChanges', (change) => {
      setCategory(change);
    });
  });

    /// FUNCTION TO POP A DONE ORDER FROM THE ARRAY ///
  const doneHandler = (id) => {
    axios.post('http://localhost:3200/adminApi/get-order', {id}, {
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

  /// FUNCTION TO CHANGE THE STATUS OF MENU ITEMS ///
  const statusHandler =  (id, status) => {
      axios.post('http://localhost:3200/adminApi/update-status', {id, status}, { headers : {
        Authorization: `${localStorage.getItem('token')}`
      } })
      .then(result => {
        console.log(result);
      })
      .catch(error=>  {
      console.log(error);
    })
  }

  useEffect(() => {
    const categoryHandler = (name) => {
      axios.get('http://localhost:3200/api/menu-items')
      .then((result) => {
          setCategory(result.data);
          console.log(category)
      })
      .catch(err =>  {
        console.log(err);
    });
    };
    categoryHandler();
  }, []);

  return (
    <div className='adminContainer'>
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
      <div>
        {category !== null  ? category.map(item => {
          return <div className="menuItems">
                  <p className="name">{item.name} - {JSON.stringify(item.available)}</p>
                  <button className='available' onClick={() => statusHandler(item._id, true)}><img src={check} alt="Disponible" /></button>
                  <button className='available' onClick={() => statusHandler(item._id, false)}><img src={remove} alt="No disponible" /></button>
                 </div>
        }) : null}
      </div>
    </div>
  )
}

export default Admin;

