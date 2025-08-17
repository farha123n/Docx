import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { NavLink } from 'react-router';

const Home = () => {
    const { user } = useAuth()
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    const [post, setPost] = useState([]);

    // Computed value: show results if search done, else show all
    const finalPost = results.length > 0 ? results : post;
    let sorted = 0
    // Fetch all posts initially
    useEffect(() => {


        axiosSecure.get('/post')
            .then(res => setPost(res.data))
            .catch(err => {
                console.error(err);
                setError("Failed to fetch posts.");
            });


    }, [axiosSecure]);

    const handleSort = () => {
        axiosSecure.get('/postsort')
            .then(res => setResults(res.data))
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
            <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-5 md:px-20">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                    {/* Text Content */}
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Discover Inspiring Stories & Tips
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Explore our blog for the latest articles on technology, lifestyle, and more. Stay updated and inspired every day!
                        </p>
                        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition">
                            Read Now
                        </button>
                    </div>

                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                            alt="Blog Banner"
                            className="rounded-xl shadow-lg max-w-full h-auto"
                        />
                    </div>
                </div>
            </section>
            <section>
                <section>

                </section>
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
            <button onClick={() => handleSort()} className='mx-auto p-1 text-xl bg-blue-800 text-white'>Sort</button>
            {/* Display posts */}
            <section className="max-w-3xl mx-auto my-10 p-4 grid gap-4">
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {finalPost.length > 0 ? (
                        finalPost.map((p) => (
                            <NavLink to={`post/${p._id}`}>  <div key={p._id} className="border p-4 w-[200px] h-[380px] rounded shadow">
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
