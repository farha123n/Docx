import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Member = () => {
      const [members, setMembers] = useState([]);

  useEffect(() => {


   axios.get('https://farhan-coral.vercel.app/users/golden')

      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  }, []);
  console.log(members)
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-yellow-600 mb-8">
        🌟 Golden Badge Members
      </h2>

      {members.length === 0 ? (
        <p className="text-gray-500">No golden members found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-6xl">
          {members.map(user => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full text-2xl font-bold">
                {user.email[0].toUpperCase()}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">{user.email}</h3>
              <span className="mt-2 inline-block bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">
                ⭐ Golden Badge
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
  

export default Member;