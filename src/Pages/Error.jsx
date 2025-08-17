import React from 'react';
import { Link } from 'react-router';

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="max-w-md text-center bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;