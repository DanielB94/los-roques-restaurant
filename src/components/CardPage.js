import React, { useContext, useState, useEffect } from 'react';
import hamburguer from '/home/daniel/online-restaurant/restaurant-front-end/src/assets/hamburguesa.png';
import './styles/cardPage.css';
import { Minus, Plus, SunMediumIcon } from 'lucide-react';
import Modifications from './modifications';
import { MenuContext } from '../context/MenuContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const CardPage = (props) => {
    const { handlerAddButton, cartItems, fillUp } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useContext(MenuContext);
    const { userInfo, setUserInfo } = useContext(UserContext);

    const navigate = useNavigate();

    /// THIS FUNCTION OPENS THE MODIFICATIONS MODULE ///
    const openModal = (id) => {
        setIsOpen(id);
    };
    console.log(userInfo)

    const redirectButton = () => {
        navigate('/login');
    }

  return <div>
            {category.map((item) => {
                return (
                    <div className='cardPageContainer' key={item._id}>
                        <img src={item.image} alt="hamburguer" />
                        <div className='textContainer'>
                            <h2>{item.name}</h2>
                            <p id='description'>{item.description}</p>
                            <p>${item.price}</p>
                            {!userInfo ? <button className=" addTocart cta" onClick={redirectButton}>Agregar al carrito</button> : <button className="addToCart cta" onClick={() => openModal(item._id)}>Agregar al Carrito</button>}
                            {isOpen === item._id ? <Modifications isOpen={isOpen} setIsOpen={setIsOpen} handlerAddButton={handlerAddButton} product={item} cartItems={cartItems} fillUp={fillUp} /> : null}
                        </div>
                        {item.available === false ? <div className='soldOut'>Agotado</div> : null}
                    </div>
                )}
                )}
    </div>
}

export default CardPage;
