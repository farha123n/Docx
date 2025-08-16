import React from 'react';
import Nav from '../Shared/Nav';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div>
            <Nav></Nav>
             <ToastContainer />
            <Outlet></Outlet>
        </div>
    );
};

export default Root;