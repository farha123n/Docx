import { useEffect, useState } from 'react';
import useAuth from './useAuth'; // Your custom hook for auth context
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/admin/${user.email}`)
        .then(res => {
          setIsAdmin(res.data?.isAdmin);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [user, axiosSecure]);

  return [isAdmin, isLoading];
};

export default useAdmin;