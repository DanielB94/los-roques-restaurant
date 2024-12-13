import React, { useContext, useEffect, useState } from 'react';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { MenuContext } from '../../context/MenuContext';
import axios from 'axios';
import check from '../../assets/check.png';
import remove from '../../assets/remove.png';
import '../styles/menuHandler.css';
import { socket } from '../../socket';


const AdminMenu = () => {

    useEffect(() => {
        const categoryHandler = (name) => {
            axios.get(`${apiUrl}/api/menu-items`)
            .then((result) => {
              setCategory(result.data);
              console.log(category)
            })
            .catch(err =>  {
              console.log(err);
            });
          };
          categoryHandler();

          socket.on('menuChanges', (change) => {
            setCategory(change);
          });
    });

      /// FUNCTION TO CHANGE THE STATUS OF MENU ITEMS ///
  const statusHandler =  (id, status) => {
    axios.post(`${apiUrl}/adminApi/update-status`, {id, status}, { headers : {
      Authorization: `${localStorage.getItem('token')}`
    } })
    .then(result => {
      console.log(result);
    })
    .catch(error=>  {
      console.log(error);
    })
  }

  const apiUrl  = useContext(ApiUrlContext);
  const [category, setCategory] = useContext(MenuContext);

  return (
    <div className='menuHandler'>
        {category !== null  ? category.map(item => {
          return <div className="menuItems">
                  <p className="name">{item.name} - {JSON.stringify(item.available)}</p>
                  <button className='available' onClick={() => statusHandler(item._id, true)}><img src={check} alt="Disponible" /></button>
                  <button className='available' onClick={() => statusHandler(item._id, false)}><img src={remove} alt="No disponible" /></button>
                 </div>
        }) : null}
    </div>
  )
}

export default AdminMenu;
