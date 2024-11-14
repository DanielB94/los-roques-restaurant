import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Password = () => {
  const [password, setPassword] = useState();
  const [confirm_password, setConfirm_password] = useState();
  const [message, setMessage] = useState(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

/// UPDATE PASSWORD HANDLER ///
  const submit = (e) => {
    e.preventDefault();
    const id  = userInfo.user.data.info._id;
    console.log(id);
    axios.post(`http://localhost:3200/api/update-user/${id}`,
      {password, confirm_password})
      .then(setMessage('Tu password ha sido cambiada correctamente'))
      .catch(err => setMessage(err));
  }

  return (
    <div className='registerContainer'>
      {userInfo ?
      <form method="post" onSubmit={submit}>
        <label htmlFor="password">Password</label>
        <input type="password" id='password' name='password' onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="confirm_password">Confirm password</label>
        <input type="password" id='confirm_Password' name='confirm_password' onChange={(e) => setConfirm_password(e.target.value)} />
        <button className='logBtn'>Enviar</button>
        {message ? <p>{message}</p> : null}
      </form> : <h2>No hay inicio de sesion</h2>}
    </div>
  )
}

export default Password;
