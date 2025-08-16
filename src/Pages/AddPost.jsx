import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';



const tagOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Health', label: 'Health' },
  { value: 'Science', label: 'Science' },
  { value: 'Education', label: 'Education' },
];

const AddPost = () => {
  const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
  const date = new Date()
  const navigate = useNavigate()
  const [post, setPost] = useState([]);
  useEffect(() => {


    axiosSecure.get('/post')
      .then(res => setPost(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to fetch posts.");
      });


  }, [axiosSecure]);
  let count=0;
 if(user){
   for(let i=0;i<post.length;i++){
     if(user.email==post[i].authorEmail){
      count++
     }
  }
 }
  console.log("count",count)
  const [selectedTag, setSelectedTag] = useState(null);
  const axiosInstance = useAxios()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if(count>5&& !user.goldenBadge){
        return toast('you cannot have more than 5 post as you are not a member')
      }
    const post = {
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      title: formData.title,
      description: formData.description,
      tag: selectedTag?.value || '',
      upVote: 0,
      downVote: 0,
      postDate: date
    };
    await axiosInstance.post('/post', post);
    toast('post uploaded')
    navigate('/')
    console.log('Submitting Post:', post);
    // send to backend API
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Author Info */}
        <div className="flex items-center space-x-4">
          <img src={user?.photoURL} alt="Author" className="w-16 h-16 rounded-full" />
          <div>
            <input type="text" value={user?.displayName} readOnly className="border px-3 py-1 w-full rounded" />
            <input type="email" value={user?.email} readOnly className="border px-3 py-1 w-full mt-2 rounded" />
          </div>
        </div>

        {/* Post Title */}
        <div>
          <label className="block mb-1 font-medium">Post Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Post Description */}
        <div>
          <label className="block mb-1 font-medium">Post Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        {/* Tag Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Tag</label>
          <Select
            options={tagOptions}
            value={selectedTag}
            onChange={setSelectedTag}
            placeholder="Select a tag"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
