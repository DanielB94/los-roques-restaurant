import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { ApiUrlContext } from '../context/ApiUrlContext';
import './styles/succeed.css'
import axios from 'axios';

const Succeess = () => {
  const apiUrl  = useContext(ApiUrlContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { rewardId, setRewardId } = useState();
  const navigate = useNavigate();

  useEffect(() => {
    /// SETS THE DESERIALIZED USER IN THE USERINFO STATE FROM GOOGLE OR FACEBOOK STRAT ///
      const google = ( async () => {
        try {
          const user = await axios.get(`${apiUrl}/api/login/success`, {withCredentials: true});
  
          if (user.data.info) {
            setUserInfo({user})
            console.log(userInfo)
          }}
        catch(err) {
          navigate('/unauthorized');
        };
       })();
  }, []);

  return (
    <div className='succeedContainer'>
      <h1>{userInfo ? userInfo.user.data.info.name : null}, Su compra ha sido exitosa</h1>
      <p>
      <Link to='/rewards'>Rewards</Link></p>
      
    </div>
  )
}

export default Succeess;
