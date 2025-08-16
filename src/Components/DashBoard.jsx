import React from 'react';
import { NavLink, Outlet } from 'react-router'; // ⚠️ Not 'react-router'
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const DashBoard = () => {
         const  {user}=useAuth()
          const axiosSecure=useAxiosSecure()
        const { data: isAdmin, isLoading } = useQuery({
            enabled: !!user?.email, // only run when user.email is available
            queryKey: ['isAdmin', user?.email],
            queryFn: async () => {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                return res.data.isAdmin;
            }
        });
        console.log(isAdmin)
    return (
        <div className='relative'>
            <div className='absolute top-0 bottom-0 left-0 w-32'>
                <div className='bg-blue-600 text-white'>
                    <p className='m-4 text-white'>DashBoard</p>
                    <NavLink to='addPost'>
                        <p className='m-4 text-white border-2 border-white p-1'>Add Post</p>
                    </NavLink>
                    <NavLink to='/dashboard'>
                        <p className='m-4 text-white border-2 border-white p-1'>My profile</p>
                    </NavLink>
                    <NavLink to='myPost'>
                        <p className='m-4 text-white border-2 border-white p-1'>My post</p>
                    </NavLink>
                    <NavLink to='member'>
                        <p className='m-4 text-white border-2 border-white p-1'>Become a member</p>
                    </NavLink>
                    {isAdmin&& <NavLink to='admin'>
                        <p className='m-4 text-white border-2 border-white p-1'>Manage users</p>
                    </NavLink>}
                   {isAdmin&& <NavLink to='adminList'>
                        <p className='m-4 text-white border-2 border-white p-1'>Admin Profile List</p>
                    </NavLink>}
               {isAdmin &&     <NavLink to='announcement'>
                        <p className='m-4 text-white border-2 border-white p-1'>Give Announcement</p>
                    </NavLink>}
                </div>
            </div>

            <div className='ml-36 p-4'>
                {/* This is where AddPost will render */}
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
