import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router';

import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import useAuth from '../Hooks/useAuth';
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const PostDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
 const { user } = useAuth(); // assuming user = { _id, name, ... }
const [localPost, setLocalPost] = useState(null);

const {data:post, isPending, error,  } = useQuery({
    queryKey: ['repoData',id],
    queryFn: () =>


     fetch(`https://farhan-coral.vercel.app/post/${id}`).then((res) =>

        res.json()
      ).then(data=>{
        console.log(data)
        return data})
  })
   const [upvoted, setUpvoted] = useState(null);
useEffect(() => {
  if (post) {
    setLocalPost(post); // Keep localPost in sync with fetched post
  }
}, [post]);
useEffect(() => {
  if (post) {
    setUpvoted(post.upVote);
  }
}, [post]);
 console.log(post)

         // Fetch post details
const alreadyVoted = post?.votedUsers?.[user?.email];

  // Upvote
  const upvoteMutation = useMutation({
  mutationFn: () => axiosSecure.patch(`/vote`, {
   email: user?.email,// Make sure `user.email` exists
   postId:id,
   voteType:'up'

  }),
  onSuccess: () => {
     setLocalPost(prev => ({
          ...prev,
          upVote: prev.upVote + 1,
          votedUsers: { ...prev.votedUsers, [user.email]: 'up' }
        }));
    queryClient.invalidateQueries(['post', id]); // lowercase `queryClient`
  }
});
  const downvoteMutation = useMutation({
  mutationFn: () => axiosSecure.patch(`/vote`, {
   email: user?.email,// Make sure `user.email` exists
   postId:id,
   voteType:'down'

  }),
  onSuccess: () => {
       setLocalPost(prev => ({
          ...prev,
          downVote: prev.downVote + 1,
          votedUsers: { ...prev.votedUsers, [user.email]: 'down' }
        }));
    queryClient.invalidateQueries(['post', id]); // lowercase `queryClient`
  }
});

  // Downvote
const voteMutation = useMutation({
  mutationFn: ({ voteType }) =>
    axiosSecure.patch(`/vote`, {
      email: user?.email,
      postId: post.id,
      voteType,
    }),
  onSuccess: () => {
    queryClient.invalidateQueries(['post', id]);
  },
});
    const handleUpvote=()=>{
      if(user?.email==post.authorEmail){
        return toast('lojja korena')
      }
      if (!alreadyVoted) {
    upvoteMutation.mutate();
  } else {
    toast('You already voted');
  }
    }
    const handleDownvote=()=>{
      if(user?.email==post.authorEmail){
        return toast('lojja korena')
      }
      if (!alreadyVoted) {
    downvoteMutation.mutate();
  } else {
    toast('You already voted');
  }
    }

  if (isPending) return <p className="text-center mt-10">Loading post...</p>;

 
  if (!post) return <p className="text-center mt-10">Loading post...</p>;
const shareUrl = `${window.location.origin}/post/${post._id}`
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow space-y-4">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <img src={post.authorImage} alt="Author" className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold">{post.authorName}</h2>
          <p className="text-sm text-gray-500">{new Date(post.postDate).toLocaleString()}</p>
        </div>
      </div>

      {/* Post Content */}
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-700">{post.description}</p>
      <p className="text-sm text-blue-600">#{post.tag}</p>

      {/* Actions */}
      <div className="flex items-center gap-6 mt-4 text-lg">
    <div className="flex items-center gap-4 mt-4 text-lg">
        <button
          className={`flex items-center gap-1 text-green-600 hover:scale-105 ${alreadyVoted === 'up' ? 'font-bold' : ''}`}
         
          onClick={() => handleUpvote()}
        >
          <FaArrowUp /> {localPost?.upVote}
        </button>

        <button
          className={`flex items-center gap-1 text-red-600 hover:scale-105 ${alreadyVoted === 'down' ? 'font-bold' : ''}`}
        
          onClick={() => handleDownvote()}
        >
          <FaArrowDown /> {localPost?.downVote}
        </button>
        <FacebookShareButton url={shareUrl} quote={post.title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <NavLink to={`/dashBoard/comment/${id}`}><button className="ml-auto px-4 py-1 border rounded hover:bg-gray-100">Comment</button></NavLink>
      </div>
    </div>
    </div>
  );
};

export default PostDetails;
