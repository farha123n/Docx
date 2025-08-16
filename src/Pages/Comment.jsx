import React from 'react';
import { useParams } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import { toast } from 'react-toastify';

const Comment = () => {
    const {user}=useAuth()
    const { id } = useParams()
     const axiosInstance = useAxios()
    console.log(id)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const comment=e.target.comment.value
        console.log('comments',comment)
     const  comments={
        post_id:id,
        post_Author:user.displayName,
        post_Author_pic:user.photo_URL,
        comment:comment
     }
     await axiosInstance.post('/comment', comments);
     toast('comment added')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                 <textarea id="w3review" name="comment" rows="4" cols="50">
             
            </textarea>
            <button className='text-white bg-blue-700 p-2 text-2xl' type="submit">Submit</button>
            </form>

            
        </div>
    );
};

export default Comment;