import React from 'react';
import { CiBadgeDollar } from "react-icons/ci";
const TableInfo = ({ user, handleCreateAdmin }) => {
    return (
        <>
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><button onClick={() => handleCreateAdmin(user.email)} className='text-white bg-blue-600 p-2 mx-auto'>add admin</button>
                </td>
                <td>Subscription Status {user.goldenBadge?<div><CiBadgeDollar className='text-yellow-700' /></div>:<><CiBadgeDollar className='text-gray-500' /></>}</td>
            </tr>
        </>
    );
};

export default TableInfo;