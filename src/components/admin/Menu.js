import axios from 'axios';
import React, { useContext, useState } from 'react'
import { ApiUrlContext } from '../../context/ApiUrlContext';
import '../styles/menu.css';

const Menu = () => {
    const apiUrl = useContext(ApiUrlContext); 

    const [menuItem, setMenuItem] = useState(null);

    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [price, setPrice] = useState(5);
    const [priceInCents, setPriceInCents] = useState(price * 1000);
    const [reward, setReward] = useState(null);
    const [picture, setPicture] = useState(null);

    const handlePicture = (event) => {
        setPicture(event.target.value[0]);
    };


    const formhandler = (e) => {

        const formData = new FormData();
        formData.append('file', picture)

        e.preventDefault();
        axios.post(`${apiUrl}/adminApi/create-menu-item`, {
            headers : {
                Authorization: `${localStorage.getItem('token')}`
              }
        }, {
            name: name,
            description: description,
            category: category,
            price: price,
            priceInCents: priceInCents,
            reward: reward,
            formData
        })
        .then(result => {
            setMenuItem('Item agregado');
        })
        .catch(err => {
            setMenuItem(`No se ha podido agregar el item, ${err.data.message}`);
        })
    };

  return (
    <div className='menuAdderContainer'>
        <h1>Menu Adder</h1>
      <form onSubmit={formhandler}>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' name='name' onChange={(e) => setName(e.target.value)} required/>
        <label htmlFor="description">description</label>
        <input type="text" id='description' name='description' onChange={(e) => setDescription(e.target.value)} required/>
        <label htmlFor="category">category</label>
        <input type="text" id='category' name='category' onChange={(e) => setCategory(e.target.value)} required/>
        <label htmlFor="price">price</label>
        <input type="number" id='price' name='price' onChange={(e) => setPrice(e.target.value)}/>
        <label htmlFor="reward">reward</label>
        <input type="number" id='reward' name='reward' onChange={(e) => setReward(e.target.value)} required/>
      </form>
        <button className='Btn'>Agregar</button>
      {menuItem ? menuItem : null}
    </div>
  )
}

export default Menu
