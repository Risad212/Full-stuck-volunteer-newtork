import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../App';

const PrivetRoute = ({ children }) => {
    const [login, setLogin] = useContext(userContext)
    
    return login ? children : <Navigate to="/login"/>
};

export default PrivetRoute;