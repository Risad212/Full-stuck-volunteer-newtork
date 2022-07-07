import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivetRoute = ({ children }) => {
    let authToken = sessionStorage.getItem('token');
    return authToken ? children : <Navigate to="/login"/>
};

export default PrivetRoute;