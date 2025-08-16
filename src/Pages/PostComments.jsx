import React from 'react';
import useAuth from '../Hooks/useAuth';

const PostComments = () => {
   const {com,acom,setaCom}=useAuth()
   console.log(com)
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
    <th>email</th>
    <th>Context</th>
    <th>feeback</th>
    <th>report</th>
  </tr>
 {com.map(c=><tr>
  <td>{c.post_Author}</td>
  <td>{c.comment}</td>
  <td>
    <form ><input type="text" />
    <button type="submit">submit</button>
    </form>
    </td>
  <td><button onClick={()=>setaCom(acom,...c)}>report</button></td>
 </tr>)}
  </table>
        </div>
</>

       
    );
};

export default PostComments;