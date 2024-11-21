import React, { useState, useContext, useEffect, useRef } from 'react';
import Hamburguer from "./Hamburguer";
import './styles/navbar.css';
import shopping from '../assets/shopping.png';
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { MenuContext } from '../context/MenuContext';
import { ErrorContext } from '../context/ErrorContext';
import { socket } from '../socket';
import { ApiUrlContext } from '../context/ApiUrlContext';

const NavBar = (props) => {
    const apiUrl  = useContext(ApiUrlContext);
    const { cartItems } = props;
    const [SignIn, setSignIn] = useState(false);
    const [hamburguerOpen, setHamburguerOpen] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [category, setCategory] = useContext(MenuContext);
    const {error, setError} = useContext(ErrorContext);
    const navigate = useNavigate();

/// HAMBURGUER OPEN HANDLER ///
    const modalRef = useRef();

    const toggleHamburguer = () => {
        setHamburguerOpen(!hamburguerOpen);
    }

    const handleClickOutside = (event) => {

        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setHamburguerOpen(false)
        }
    };

    useEffect(() => {

    /// USER SIGN IN HANDLER ///
        if (userInfo) {
            setSignIn(true);
        } else {
            setSignIn(false);
        }

    /// HAMBURGUER OPEN HANDLER ///
        if (hamburguerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            };
    }, [userInfo, hamburguerOpen]);

    /// LOGOUT HANDLER ///
    const logout = () => {
        axios.post(`${apiUrl}/api/logout`, {}, {withCredentials: true})
        .then(user => {
            setUserInfo(null);
            socket.disconnect();
            navigate('/');
        })
        .catch(err => navigate('/serverError'));
    }

    /// ORDER BTN HANDLER ///
    const orderBtn = () => {
        axios.get(`${apiUrl}/api/menu-items`)
        .then((result) => {
            setCategory(result.data);
        })
        .then(navigate('/orderPage'))
        .catch(err =>  {
          setError(err);
          navigate('/ErrorPage');
      });
    }

    return (
        <div className="navBar">
            <div className="logoDiv"><Link to='/'><img className="logo" src={logo} alt="logo" /></Link></div>
            <div ref={modalRef} className={`${hamburguerOpen ? 'dropMenuVisible' : 'dropMenuInvisible'}`}>
                <ul>
                    <li onClick={() => setHamburguerOpen(false)}><Link to='/rewards'>Rewards</Link></li>
                    <li onClick={() => setHamburguerOpen(false)}><Link to="/orderPage" onClick={orderBtn}>Order Now</Link></li>
                    {SignIn ? <li onClick={() => setHamburguerOpen(false)}><button onClick={logout}>Log out</button></li> : <li onClick={() => setHamburguerOpen(false)}>
                        <Link to='/logIn'>Log In</Link></li>}
                </ul>
            </div>
            <div className="shoppingCar">
                {cartItems.length > 0 ?
                <div className="counter">
                    <p>{cartItems.length}</p>
                </div> : null}
                <div>
                    <Link to='shoppingCart'><ShoppingCart size={32} color="black"/></Link>
                </div>
            </div>
          <div className="hamburguer" onClick={toggleHamburguer}>
            <Hamburguer />
          </div>
        </div>
    )
}

export default NavBar;
