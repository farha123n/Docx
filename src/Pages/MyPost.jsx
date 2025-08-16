import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router';

const MyPost = () => {
  const axiosSecure = useAxiosSecure();
  const navigate=useNavigate()
  const queryClient = useQueryClient();
   const { user ,com,setCom} = useAuth();
  const { data: userPosts = [], isPending } = useQuery({
    enabled: !!user?.email,
    queryKey: ['user-posts', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/user/${user.email}`);
      return res.data;
    }
  });
     const handleComment=async(id)=>{
    
   // Only run when postId is set
  
      const res = await axiosSecure.get(`/comments/${id}`);
  
    
  

  setCom(res.data)
  navigate('/postComment')
  }
  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      return await axiosSecure.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-posts', user?.email]);
    }
  });

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId);
    }
  };

  return (
    <>
      <style>{`
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        tr:nth-child(even) {
          background-color: #dddddd;
        }
      `}</style>

      <div>
        <table>
          <thead>
            <tr>
              <th>Post Title</th>
              <th>Total Votes</th>
              <th>Comment</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.upVote + post.downVote}</td>
                <td>
                  <button
                    onClick={() => handleComment(post._id)}
                    className="bg-blue-700 text-white p-2"
                  >
                    Comment
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-600 text-white p-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyPost;
