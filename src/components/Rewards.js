import React, { useContext, useEffect, useState } from 'react';
import './styles/rewards.css';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { RewardContext } from '../context/RewardContext';
import { MenuContext } from '../context/MenuContext';
import { ErrorContext } from '../context/ErrorContext';
import { socket } from '../socket';


const Rewards = (props) => {
  const { getColor, progress} = props;
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const { reward, setReward } = useContext(RewardContext);
  const [category, setCategory] = useContext(MenuContext);
  const {error, setError} = useContext(ErrorContext);

  
  useEffect(() => {
  /// SETS THE DESERIALIZED USER IN THE USERINFO STATE FROM GOOGLE OR FACEBOOK STRAT ///
    const google = ( async () => {
      try {
        const user = await axios.get('http://localhost:3200/api/login/success', {withCredentials: true});

        if (user.data.info) {
          setUserInfo({user})
          socket.connect();
          socket.emit('joinRoom', user.data.info._id);
        }}
      catch(err) {
        navigate('/unauthorized');
      };
     })();

  /// SET THE REWARDS POINTS OF THE USER INTO THE REWARD STATE ///
     const rewardsApi = ( async () => {
      try {

      const rewardResult = await axios.get('http://localhost:3200/api/rewards', {withCredentials: true})
        
      setReward(rewardResult.data.user.rewards);

      } catch(err) {
        navigate('/unauthorized');
      }
     })();
  }, []);

  const orderBtn = () => {
    axios.get('http://localhost:3200/api/menu-items')
    .then((result) => {
        setCategory(result.data);
    })
    .then(navigate('/orderPage'))
    .catch(err =>  {
      setError(err.response.data);
      navigate('/ErrorPage');
  });
}
    return (
      <div className='rewardsContainer'>
        {userInfo ?
        <div className="displayInfo">
          <h1>{userInfo.user.data.info.name}</h1>
          <h2>Tienes ${reward} en Recompensas</h2>
        </div> : <h2>Registrate para obtener puntos de recompensa</h2>}
        <Link to={userInfo ? '/orderPage' : '/logIn'}>{userInfo ?<button className='logBtn' onClick={orderBtn}>CANGEAR AHORA</button> : <button className='logBtn'>REGISTRATE</button>}</Link>
        <div className="rewardsInfo"> 
          <ul>
            <li>Suma Hasta $20 en recompensas.</li>
            <li>Por cada burguer, patacon, arepa o pepito que compres suma $1.</li>
            <li>Por cada entrada o perro caliente que compres suma $0.50.</li>
          </ul>
        </div>
      </div>
    ) 
  }

export default Rewards;
