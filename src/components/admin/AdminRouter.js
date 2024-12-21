import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AdminMenu from './AdminMenu';
import AdminLog from './AdminLog';
import Admin from './Admin';
import Menu from './MenuAdder';

const AdminRouter = () => {
  return (
    <div className='adminRouter'>
        <Routes>
            <Route path='menu-handler' element={<Menu/>} />
            <Route path='eljalabolas' element={<Admin />} />
            <Route path='admin-menu' element={<AdminMenu />} />
        </Routes>
    </div>
  )
}

export default AdminRouter;
