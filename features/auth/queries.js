import { useQuery } from '@tanstack/react-query';
import { getUserData } from './api';

// features/auth/queries.js
import { getToken } from '../../utils/auth';



export const useAuthStatus = () => {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: async () => {
      const token = await getToken();
      console.log('[useAuthStatus] token:', token);
      return !!token;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    // refetchInterval: 1000,  // 🔁 Check every second
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};


// features/auth/queries.js
export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserData, // make sure this function exists
  });
};
