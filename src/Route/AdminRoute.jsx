
import React from 'react';
import { Navigate, useLocation } from 'react-router'
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation(); // 

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }

    if (!user || role !== 'admin') {
        return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
    }

    return children;

};

export default AdminRoute;