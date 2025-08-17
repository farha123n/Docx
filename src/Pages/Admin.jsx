import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableInfo from '../Components/TableInfo';

const Admin = () => {

    const [users, setUsers] = useState([])
    const [filterUser, setFilterUser] = useState([])
    useEffect(() => {
          axios.get('https://farhan-coral.vercel.appusers').
            then(res => setUsers(res.data))
            .catch(err => console.log(err))

    }, [])


      

    console.log(users)
    useEffect(() => {
        const remainingUser = users.filter(user => user.role == 'user')
        setFilterUser(remainingUser)
    }, [users])
    console.log('filter', filterUser)
    const handleCreateAdmin = (email) => {
        
axios.patch(`https://farhan-coral.vercel.appuser/admin/${email}`)
            .then(res =>{ console.log(res.data.message)
                   toast.success(res.data.message || 'Made admin successfully');
        // Remove that user from list
        setFilterUser(prev => prev.filter(user => user.email !== email));
            })
            .catch(err => console.error(err));
    }
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

                <div>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>action</th>
                            <th>Subscription</th>
                        </tr>
                        {filterUser.map(user=><TableInfo user={user} key={user._id} handleCreateAdmin={handleCreateAdmin}></TableInfo>)}
                        </table>
                </div>

                <button onClick={() => handleCreateAdmin("admin123@gmail.com")} className='text-white bg-blue-600 p-2 mx-auto'>add admin</button>
            </div>
        </>

    );
};

export default Admin;