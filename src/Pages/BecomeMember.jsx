import React from 'react';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Replace with your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
console.log(import.meta.env.VITE_STRIPE_API_KEY)
const BecomeMember = () => {
      const [hasPaid, setHasPaid] = useState(false);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Request to your backend to create a checkout se
    const { data } = await axios.post('https://farhan-coral.vercel.appcreate-checkout-session');



    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  // Check URL for payment success (e.g. after redirect from Stripe)
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setHasPaid(true);
    }
  }, []);
    return (
        <div className="p-4">
             <h1 className="text-xl mb-4"> Pay with Stripe</h1>

      {hasPaid ? (
        <div className="p-4 bg-yellow-300 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-yellow-900">🏅 Golden Badge Unlocked!</h2>
          <p className="text-sm mt-2">Thank you for your support!</p>
        </div>
      ) : (
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Pay & Get Golden Badge
        </button>
      )} 
        </div>
    );
};

export default BecomeMember;