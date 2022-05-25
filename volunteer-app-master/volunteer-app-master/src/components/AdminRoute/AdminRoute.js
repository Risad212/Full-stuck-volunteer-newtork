import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const adminEmail = sessionStorage.getItem('adminEmail')
    return adminEmail ? children : <Navigate to="/adminlogin" />
};

export default AdminRoute;