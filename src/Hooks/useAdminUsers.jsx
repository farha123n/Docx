import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
const useAdminUsers = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/admin');
      return res.data;
    },
  });
};

export default useAdminUsers;