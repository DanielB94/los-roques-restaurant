import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/adminNavbar.css';

const AdminNavbar = () => {
  return (
    <div>
      <Link to='menu-handler' className='link'>Agregar Item</Link>
      <Link to='admin-menu' className='link'>Menu</Link>
      <Link to='eljalabolas' className='link'>Admin</Link>
    </div>
  )
}

export default AdminNavbar
