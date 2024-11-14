import React from 'react';
import './styles/info.css';
import about from '../assets/group.png';
import rewards from '../assets/loyal-customer.png';
import giftCards from '../assets/gift-card.png';

const Info = () => {
  return (
    <div className='infoContainer'>
      <div className="info">
        <img src={about} alt="about" />
        <h3>About Us</h3>
        <button className='learn'>LEARN MORE</button>
      </div>
      <div className="info">
        <img src={rewards} alt="rewards" />
        <h3>Reward's<br />Member</h3>
        <button className='learn'>LEARN MORE</button>
      </div>
      <div className="info">
        <img src={giftCards} alt="giftCards" />
        <h3>Gift Cards</h3>
        <button className='learn'>LEARN MORE</button>
      </div>
    </div>
  )
}

export default Info
