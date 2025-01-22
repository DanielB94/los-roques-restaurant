import React, { useContext } from 'react';
import Info from './Info';
import './styles/homePage.css';
import axios from 'axios';
import { MenuContext } from '../context/MenuContext';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorContext } from '../context/ErrorContext';
import { ApiUrlContext } from '../context/ApiUrlContext';

const HomePage = () => {
  const apiUrl  = useContext(ApiUrlContext);
  const [category, setCategory] = useContext(MenuContext);
  const { error, setError } = useContext(ErrorContext);
  const navigate = useNavigate();

/// SET IN THE CATEGORY STATE THE CATEGORY DESIRE ///
  const categoryHandler = (name) => {
    axios.post(`${apiUrl}/api/menu-item-category`, {category: 'hamburguer'})
    .then((result) => { 
      setCategory(result.data);
    })
    .then(() => navigate('/orderPage'))
    .catch(err => {
      setError(err.response.data);
      navigate('/ErrorPage');
    });
  }

  /// REGISTER BTN HANDLER ///
  const registerBtn = () => {
    navigate('/login');
  };

  return (
    <div className='homeContainer'>
      <div className="banner">
        <h1>Registrate <br /> Obten recompensas por compra</h1>
        <button className="cta" onClick={registerBtn}>Registrate Aqui</button>
      </div>
      <div className="menu">
        <h2>MENU HIGHLIGHTS</h2>
        <div className="menucards">
          <div className='entries cards'>
            <div className='cardInfo'>
              <h2>Entries</h2>
              <button className='cta' name='entries' onClick={(e) => categoryHandler(e.target.name)}>ORDER NOW</button>
            </div>
          </div>
          <div className='hamburguers cards'>
            <div className='cardInfo'>
              <h2>Hamburguers</h2>
              <button className='cta' name='hamburguer' onClick={(e) => categoryHandler(e.target.name)}>ORDER NOW</button>
            </div>
          </div>
          <div className='patacon cards'>
            <div className='cardInfo'>
              <h2>Patacones</h2>
              <button className='cta' name='patacon' onClick={(e) => categoryHandler(e.target.name)}>ORDER NOW</button>
            </div>
          </div>
          <div className='arepas cards'>
            <div className='cardInfo'>
              <h2>Arepas</h2>
              <button className='cta' name='arepas' onClick={(e) => categoryHandler(e.target.name)}>ORDER NOW</button>
            </div>
          </div>
          <div className='bread cards'>
            <div className='cardInfo'>
              <h2>Subways<br />and Hot dogs</h2>
              <button className='cta' name='subways' onClick={(e) => categoryHandler(e.target.name)}>ORDER NOW</button>
            </div>
          </div>
        </div>
      </div>
      <Info />
    </div>
  )
}

export default HomePage
