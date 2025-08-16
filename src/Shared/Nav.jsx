import React, { useState } from 'react';
import docx from '../assets/docx.png'
import { Link, NavLink, useNavigate } from 'react-router';
import { IoIosNotifications } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
const Nav = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { user, logOut, announcementCount } = useAuth()
  
    const handleLogOut = () => {
        logOut().then(() => {
            toast("Sign out Successful")
            navigate('/')
        }).catch((error) => {
            toast(error)
        })
    }
    console.log(user)
    const link = <>
        <li className='px-5 py-3 text-xl text-blue-500'><Link to='/'>Home</Link></li>
        <li className='px-5 py-3 text-xl text-blue-500'><Link to='/membership'>Membership</Link></li>
        <li className='px-5 py-3 text-3xl mt-2 text-blue-500'><div className='relative'><Link to='/notification'><IoIosNotifications /></Link><div className='absolute text-black -top-3 bg-red-400 text-sm right-0'>{announcementCount}</div></div></li>

    </>
    return (

        <nav className='flex justify-between items-center'>


            <div className='pt-0 relative flex items-center'>

                <img className='w-[100px] h-[100px] pt-0' src={docx} alt="docx" />
                <span onClick={() => setOpen(!open)}>
                    {open ? <IoCloseSharp className='md:hidden' /> : <IoMenu className='md:hidden' />}
                </span>

                {/* Mobile menu, conditionally rendered */}
                {open && (
                    <ul className={`md:hidden absolute duration-1000 ${open ? "top-20" : '-top-40'} text-white  bg-blue-600`}>
                        {link}
                    </ul>
                )}

            </div>
            <div>
                <ul className='md:flex hidden'>
                    {link}
                </ul>
            </div>
            <div>
                {user ? <div className=''>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <img className='w-14 rounded-full' src={user.photoURL} alt="" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Header>{user.displayName}</Dropdown.Header>
                            <Dropdown.Item><NavLink to='/dashboard'>Dashboard</NavLink></Dropdown.Item>
                            <Dropdown.Item>
                                <div>
                                    <button onClick={handleLogOut} className='bg-blue-600 text-white text-xl px-3 py-2 rounded-3xl'>Sign out</button>
                                </div>
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                </div> : <NavLink to='/login'>
                    <button className='bg-blue-600 text-white text-xl px-3 py-2 rounded-3xl'>
                        Join us
                    </button>
                </NavLink>
                }
            </div>
        </nav>

    );
};

export default Nav;