import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';

export default function Success() {
    const {user}=useAuth()
  const [session, setSession] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  


  useEffect(() => {
    if (sessionId) {


      axios.get(`https://server-rho-lime-60.vercel.app/checkout-session/${sessionId}`)

        .then(res => setSession(res.data))
        .catch(err => console.error(err));
    }
  }, [sessionId]);
useEffect(() => {
  if (sessionId && user?.email) {
    axios.patch(`https://server-rho-lime-60.vercel.app/user/${user?.email}`, {

      goldenBadge: true
    })
    .then(res => {console.log("Golden badge added")
        
    })
    .catch(err => console.error("Error updating user:", err));
  }
}, [sessionId, user?.email]);
  if (!session) return <p>Loading...</p>;
     console.log(session)
  return (
    <div>
      <h2>Payment Successful 🎉</h2>
      <p>Amount Paid: ${session.amount_total / 100}</p>
      <p>Email: {session.customer_email}</p>
      <p>Status: {session.payment_status}</p>
    </div>
  );
}