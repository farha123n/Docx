import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
      const {user,loading}=useAuth()
    if(loading){
        return (
             <div>Loading...</div>
        )
    }
    if(user){
        return children
    }
    return (
        <div>
            <Navigate state={location.pathname} to='/login'></Navigate>
        </div>
    );
};

export default PrivateRoute;