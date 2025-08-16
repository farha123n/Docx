import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Notification = () => {
    const [announces,setAnnounces]=useState([])
    useEffect(()=>{

      axios.get('https://server-rho-lime-60.vercel.app/announcement').

      then(res=>{setAnnounces(res.data)}).
      catch(err=>console.log(err))
    },[])
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
            <table>
  <tr>
    <th>Author name</th>
    <th>profilePic</th>
    <th>title</th>
    <th>description</th>
  </tr>
  {announces.map(announce=><tr>
     <td>{announce.authorName}</td>
     <td><img src={announce.profilePic} alt="" /></td>
     <td>{announce.title}</td>
     <td>{announce.description}</td>

  </tr>)}
  </table>
        </div>
       </>
    );
};

export default Notification;