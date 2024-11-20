import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';
import OrderPage from './OrderPage';
import LogIn from './LogIn';
import Register from './Register';
import CartPage from './CartPage';
import Rewards from './Rewards';
import Password from './Password';
import Admin from './Admin';
import Succeess from './Succeess';
import Failed from './Failed';
import Unauthorized from './unauthorized';
import ErrorPage from './ErrorPage';
import AdminLog from './AdminLog';
import ServerError from './ServerError';
import OrderDetail from './OrderDetail';
import CookieConsent from "react-cookie-consent";

const RouteSwitch = (props) => {
    const {cartItems, setCartItems, handlerAddButton, fillUp, getColor, progress} = props;
  return (
    <div>
      <div className="content">
        <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
        <Routes>
          <Route path='adminLog' element={<AdminLog />} />
          <Route path='errorPage' element={<ErrorPage />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          <Route path='failed' element={<Failed />} />
          <Route path='order/success' element={<Succeess />} />
          <Route path='orderPage' element={<OrderPage handlerAddButton={handlerAddButton} cartItems={cartItems} fillUp={fillUp} />} />
          <Route path= 'logIn' element={<LogIn />} />
          <Route path='register' element={<Register />} />
          <Route path='shoppingCart' element={<CartPage cartItems={cartItems} setCartItems={setCartItems}/>} />
          <Route path='rewards' element={<Rewards getColor={getColor} progress={progress} />} progress={progress} />
          <Route path='password' element={<Password />} />
          <Route path='eljalabolas' element={<Admin />} />
          <Route path='serverError' element={<ServerError />} />
          <Route path='order-details/:id' element={<OrderDetail />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default RouteSwitch;
