import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Member = () => {
      const [members, setMembers] = useState([]);

  useEffect(() => {


    axios.get('https://server-rho-lime-60.vercel.app/users/golden')

      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  }, []);
    return (
        <div>
              <h2>Members with Golden Badge</h2>
      <ul>
        {members.map(user => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
        </div>
    );
};

export default Member;