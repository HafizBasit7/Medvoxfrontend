// hooks/useAuthStatus.js
import { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';

export const useAuthStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  return { isLoading, isLoggedIn };
};