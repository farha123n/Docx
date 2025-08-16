import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const Report = () => {
    const { acom, refetchAcom } = useAuth(); // Optional: add `refetchAcom` if available
    const axiosSecure = useAxiosSecure();

    const handleDelete = async (id) => {
        try {
            const res = await axiosSecure.delete(`/comment/${id}`);
            if (res.data.deletedCount > 0) {
                toast('Comment deleted');
                
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
            alert('Failed to delete comment');
        }
    };

    return (
        <div>
            <h1>Reported Comments</h1>
            {acom.map(a => (
                <div key={a._id} className="flex gap-4 items-center my-2">
                    <div>{a.comment}</div>
                    <button
                        onClick={() => handleDelete(a._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Report;
