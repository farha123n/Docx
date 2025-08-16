import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Announcement = () => {
    const {user,setAnnouncementCount}=useAuth()
    const navigate=useNavigate()
  const axiosInstance = useAxios()
    const handleSubmit= async(e)=>{
        e.preventDefault()
       const title=e.target.title.value
       const description=e.target.description.value
      const AnnouncementInfo={
        authorName:user.displayName,
        profilePic:user.photoURL,
        title:title,
        description:description
       }
           await axiosInstance.post('/announcement', AnnouncementInfo);
           toast('announce given')
           navigate('/')
           console.log('Submitting Announcement:', AnnouncementInfo);
           setAnnouncementCount(prev => prev + 1)
    }

    return (
        <div>
            
<form onSubmit={handleSubmit}>
  <label htmlFor="fname">Title</label><br/>
  <input className='p-4 max-w-52' type="text"  name="title" /><br/>
  <label htmlFor="lname">Last name:</label><br/>
  <input className='p-4 max-w-52' type="text"  name="description" /><br></br>
  <input className='bg-blue-600 text-white p-2' type="submit" value="Submit"/>
</form> 
        </div>
    );
};

export default Announcement;