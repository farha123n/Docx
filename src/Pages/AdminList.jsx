import React, { useEffect, useState } from 'react';
import useAdminUsers from '../Hooks/useAdminUsers';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer
} from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; 
const AdminList = () => {
  const { data: admins = [], isLoading, error } = useAdminUsers();
  const axiosSecure = useAxiosSecure();



  const { data: comments = [], isPending: commentsPending, error: commentsError } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axiosSecure.get('/comments');
      return response.data;
    }
  });
  const { data: users = [], isPending: usersPending, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosSecure.get('/users'); // <-- Correct endpoint
      return response.data;
    }
  });

  // Fetch posts using TanStack Query (instead of useEffect)
  const { data: posts = [], isPending: postsPending, error: postsError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/post');
      return res.data;
    }
  });

  // Loading state
  if (isLoading || commentsPending || postsPending) return <p>Loading...</p>;
  if (isLoading || commentsPending || postsPending || usersPending) return <p>Loading...</p>;
  if (error || commentsError || postsError || usersError) return <p>Error loading data</p>;

  // Log counts safely
  console.log("Comments:", comments.length);
  console.log("Posts:", posts.length);
  console.log("users:", users.length);
  const pieData = [
    { name: 'Comments', value: comments.length },
    { name: 'Posts', value: posts.length },
    { name: 'Users', value: users.length },
  ];
  return (
    <div>

      <h2>Admin Users:</h2>
      <ul>
        {admins.map((user) => (
          <div className='flex gap-5' key={user._id}>
            <div>
              {user.name}
            </div>
            <div>
              {user.email}
            </div>
            <ul>
              <li><img className='w-20 h-24 rounded-full' src={user.profilePic} alt="" /></li>
            </ul>
          </div>
        ))}
      </ul>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <h1 className='text-2xl text-blue-600 text-center'>Total number of comments,users, posts</h1>
    </div>
  );
};

export default AdminList;