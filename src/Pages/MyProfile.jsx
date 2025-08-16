import React from 'react';

import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { CiBadgeDollar } from 'react-icons/ci';

const MyProfile = () => {
      const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // assumes `user.email` is available

  const { data: userInfo, isLoading, isError, error } = useQuery({
    enabled: !!user?.email, // only run when email exists
    queryKey: ['user-info', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    }
  });
   const { data: userPosts = [], ispending, isErr, err } = useQuery({
    enabled: !!user?.email,
    queryKey: ['user-posts', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/user/${user.email}`);
      return res.data;
    }
  });
  console.log(userInfo,userPosts)
    return (
        <div>
           <ul className='mx-auto'>
            <li className=''>user name {user.displayName}</li>
            <li className='mx-auto'><img className='mx-auto' src={user.photoURL} alt="" /></li>
            <li>email {user.email}</li>
            <li>badge {userInfo?.goldenBadge?<div><CiBadgeDollar className='text-yellow-700 text-6xl mx-auto' /></div>:<><CiBadgeDollar className='text-gray-500 text-6xl mx-auto' /></>}</li>
           </ul>
           {userPosts.length==0 &&<div className='text-6xl text-black'>no post</div>}
           <div>
             {userPosts.map((post,index)=><div className='md:flex'>
                <div>{index+1}</div>
                <div>post :{post.title}</div>
                <div>post :{post.description}</div>
                <div>post :{post.tag}</div>
             </div>)}
           </div>
        </div>
    );
};

export default MyProfile;