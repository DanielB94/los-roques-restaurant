import React, { useContext, useEffect, useState } from 'react';
import './styles/cartPage.css';
import axios from 'axios';
import { OrderContext } from '../context/OrderContext';
import { ErrorContext } from '../context/ErrorContext';
import Modifications from './modifications';
import { useNavigate } from "react-router-dom";
import { RewardContext } from '../context/RewardContext';
import { UserContext } from '../context/UserContext';
import PhoneModal from './PhoneModal';
import { socket } from '../socket';
import { ApiUrlContext } from '../context/ApiUrlContext';
import { OptionContext } from '../context/OptionContext';

import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const CartPage = (props) => {
    const navigate = useNavigate();
    const { cartItems } = props;
    const {setCartItems } = props;
    const apiUrl  = useContext(ApiUrlContext);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const {orders, setOrders} = useContext(OrderContext);
    const { error, setError } = useContext(ErrorContext);
    const { reward, setReward } = useContext(RewardContext);
    const { option, setOption } = useContext(OptionContext);

    const [ stripePromise, setStripePromise ] = useState(null);

    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [phone, setPhone] = useState(null);
    const [checkoutVisible, setCheckoutVisible] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [message, setMessage] = useState(null);
    
    /// KNOW IF THE USER IS AUTHENTICATED LOGIC ///
    let user;
    
    const userHandler = (() => {
        if (userInfo) {
            return user = userInfo.user.data.info;
        } else {
            return user = null
        }
    })();
    
    useEffect(() => {
        if (user) {
            axios.get(`${apiUrl}/api/stripeConfig`)
            .then(result => setStripePromise(loadStripe(result.data.publishableKEY, console.log(result))))
            .catch(err => navigate('/serverError'));
        } else {
            return null;
        }
    }, []);

    useEffect(() => {
        if (userInfo) {
            if (userInfo.user.data.info.phone) {
                return setPhone(userInfo.user.data.info.phone)
            } else {
                return setPhone(null);
            }
        }
    }, [userInfo]);
    console.log(phone)

/// PHONE NUMBER MODAL HANDLER ///
const closeModal = () => {
    if (isModalVisible) {
        SetIsModalVisible(false);
    }
};

const checkboxHandler = () => {
    if (checkbox) {
        setCheckbox(false);
    } else {
        setCheckbox(true);
    }
    console.log(checkbox);
};

    /// THIS FUNCTIONS HANDLERS ALL THE MATH LOGIC FROM THE CARTITEMS ARRAY ///
    const getSubTotal = () => {
        let subTotal = 0;
        let totalProducts = 0;
        let taxes = 0;
        let total = 0;
        let itemsReward = 0;

        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];

            subTotal += item.price;
            totalProducts = i + 1;
            taxes += item.price * 0.0825;
            if (itemsReward >= 20) {
                itemsReward = 20;
            } else {
                itemsReward += item.reward;
            }

        }

        total += subTotal + taxes;

        return { subTotal, totalProducts, taxes, total, itemsReward };
    };

    const subTotal = getSubTotal().subTotal;
    const totalProducts = getSubTotal().totalProducts;
    const totalTaxes = getSubTotal().taxes;
    const totalItemsRewards = getSubTotal().itemsReward;
    const  total = getSubTotal().total;

    /// CREATES AND SUBMITS ORDERS TO THE API ///
    const orderHandler = async (e) => {

        try {
            e.preventDefault();
            if (user === null) {
                navigate('/errorPage');
                console.log('.');
            } else {
                if (userInfo.user.data.info.hasOwnProperty('phone') || phone !== null) {
                    const order = await axios.post(`${apiUrl}/api/create-order`, {
                        client: user._id,
                        client_name: user.name,
                        cart: cartItems,
                        address: "frankford",
                        cart_rewards: totalItemsRewards,
                        user_rewards: reward,
                        rewards: checkbox,
                        subTotal: subTotal,
                        totalProducts: totalProducts,
                        totalTaxes: totalTaxes,
                        total: total
                    }, { withCredentials: true})
                    .then((result) => {
                        console.log(result)
                        setOrders(result.data.order);
                        setOption({clientSecret: `${result.data.client_secret}`});
                        console.log(option)
                        setCheckoutVisible(true);
                    })
                    
                } else {
                    SetIsModalVisible(true);
                    console.log('desde aqui');
                    
                }
            }
        } 
        catch (err){
            navigate('/serverError');
            console.log(err, 'desde cartPage');
        }
    }
    /// REMOVE AND ITEM FROM SHOPPING CART ///
    const deleteHandler = (index) => {
        const filteredData = cartItems.filter(item => index !== cartItems.indexOf(item))
        setCartItems(filteredData)
    }

  return (
    <div className='cartContainer'>

        {isModalVisible ? <PhoneModal closeModal={closeModal} phone={phone} setPhone={setPhone} /> : null}
      <h2 id='h2'>Su carro de compras</h2>

        {cartItems.map((cartItem) => {
            return(
                <div className='cardPageContainer' key={cartItem.id}>
                    <img src={cartItem.image} alt={cartItem.name} />
                    <div className="textContainer">
                        <h2>{cartItem.name}</h2>
                        {cartItem.mod ? <ul>{cartItem.mods.map((mod) => {
                            return <li key={cartItem.mods.indexOf(mod)}>{mod}</li>
                        })}</ul> : null}
                        <p>${cartItem.price}</p>
                        <div className="cartBtns">
                            <button className='addToCart cta' onClick={() => deleteHandler(cartItems.indexOf(cartItem))}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )
        })}
        {cartItems.length >= 1 ?
            <div className="total">
                {reward === 0 ? null : <div className='reward'>
                    <label htmlFor="reward">Usar tus ${reward} acumualdos </label>
                    <input id='reward' type='checkbox' onClick={checkboxHandler}/>
                </div>}
                <p>Subtotal ({totalProducts} productos): ${subTotal}</p>
                <p>Taxes: ${totalTaxes}</p>
                <p>Total: ${total}</p>
                <p id='reward'>Recompensas por esta compra ${totalItemsRewards}</p>
                <button className='cta' onClick={orderHandler}>Comprar</button>
                {message ? <p>{message}</p> : null}
            </div> : <p>Tu carrito esta vacio</p>}
            {option !== null && checkoutVisible === true ?
            <CheckoutForm setCheckoutModal={setCheckoutVisible}/> :
            null
            }
        </div>
  )
}

export default CartPage;
