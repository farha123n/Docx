import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { NavLink } from 'react-router';

const Home = () => {
    const {user}=useAuth()
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    const [post, setPost] = useState([]);

    // Computed value: show results if search done, else show all
    const finalPost = results.length > 0 ? results : post;
    let sorted=0
    // Fetch all posts initially
    useEffect(() => {
        
      
          axiosSecure.get('/post')
            .then(res => setPost(res.data))
            .catch(err => {
                console.error(err);
                setError("Failed to fetch posts.");
            });
        
       
    }, [axiosSecure]);
 
     const handleSort=()=>{
         axiosSecure.get('/postsort')
            .then(res => setPost(res.data))
            .catch(err => {
                console.error(err);
                setError("Failed to fetch posts.");
            });
     }
    // Handle tag search
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        try {
            const res = await axiosSecure.get(`/posts/search?tag=${query}`);
            setResults(res.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Something went wrong while searching.");
            setResults([]);
        }
    };

    return (
        <div>
            <section>
                <h1 className='text-blue-700 text-2xl text-center my-5'>Find different posts through tag line</h1>
                <div className="max-w-md mx-auto p-4">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search by post tag..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full border px-4 py-2 rounded shadow"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </section>
                <button onClick={handleSort()} className='mx-auto p-1 text-xl bg-blue-800 text-white'>Sort</button>
            {/* Display posts */}
            <section className="max-w-3xl mx-auto my-10 p-4 grid gap-4">
               <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                 {finalPost.length > 0 ? (
                    finalPost.map((p) => (
                      <NavLink to={`/dashBoard/post/${p._id}`}>  <div key={p._id} className="border p-4 rounded shadow">
                            <img className='w-14 mx-auto rounded-full' src={p.authorImage} alt="" />
                            <h2 className="text-xl font-bold">{p.title}</h2>
                            <p>{p.description}</p>
                            <p className="text-sm text-blue-500 mt-2">#{p.tag}</p>
                            <div className='flex justify-between'>
                                <p>upvote {p.upVote}</p> <p>downvote {p.downVote}</p>
                            </div>
                        </div></NavLink>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No posts to display.</p>
                )}
               </div>
            </section>
        </div>
    );
};

export default Home;
