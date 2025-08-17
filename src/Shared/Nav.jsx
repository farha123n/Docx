import React, { useState } from 'react';
import docx from '../assets/docx.png';
import { Link, NavLink, useNavigate } from 'react-router';
import { IoIosNotifications } from "react-icons/io";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logOut, announcementCount } = useAuth();

    const handleLogOut = () => {
        logOut().then(() => {
            toast("Sign out Successful");
            navigate('/');
        }).catch((error) => {
            toast(error);
        });
    };

    const link = (
        <>
            <li className='px-5 py-2 text-lg hover:text-white hover:bg-blue-200 rounded '>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li className='px-5 py-2 text-lg hover:text-white hover:bg-blue-200 rounded '>
                <Link to='/membership'>Membership</Link>
            </li>
            <li className='px-5 py-2 text-lg relative'>
                <Link to='/notification' className='text-blue-500 hover:text-white'>
                    <IoIosNotifications size={24} />
                    {announcementCount > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full'>
                            {announcementCount}
                        </span>
                    )}
                </Link>
            </li>
        </>
    );

    return (
        <nav className='bg-white shadow-md sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center py-3 px-4 md:px-8'>
                {/* Logo and mobile toggle */}
                <div className='flex items-center gap-4'>
                    <img className='w-20 h-auto' src={docx} alt="Logo" />
                    <span className='md:hidden text-2xl cursor-pointer' onClick={() => setOpen(!open)}>
                        {open ? <IoCloseSharp /> : <IoMenu />}
                    </span>
                </div>

                {/* Desktop links */}
                <ul className='hidden md:flex items-center gap-4'>
                    {link}
                </ul>

                {/* User / Join Us */}
                <div>
                    {user ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic" className="border-0 p-0">
                                <img className='w-12 h-12 rounded-full object-cover' src={user.photoURL} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Header>{user.displayName}</Dropdown.Header>
                                <Dropdown.Item><NavLink to='/dashboard'>Dashboard</NavLink></Dropdown.Item>
                                <Dropdown.Item>
                                    <button onClick={handleLogOut} className='bg-blue-600 text-white text-sm px-3 py-1 rounded-full w-full'>
                                        Sign out
                                    </button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <NavLink to='/login'>
                            <button className='bg-blue-600 text-white text-sm md:text-lg px-4 py-2 rounded-full hover:bg-blue-700 transition'>
                                Join Us
                            </button>
                        </NavLink>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <ul className='md:hidden bg-blue-600 text-white flex flex-col gap-2 px-4 py-4 animate-slide-down'>
                    {link}
                </ul>
            )}
        </nav>
    )
};

export default Nav;
