import { useEffect } from 'react';
import { refreshAccessToken } from '@/lib/auth-api';
import useAuthStore from '@/store/auth-store';

export const useAuthInit = () => {
  const { refreshToken, setTokens, setIsAuthenticated, logout } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    if (!refreshToken) return;

    refreshAccessToken(refreshToken)
      .then((data) => {
        setTokens(data.accessToken, refreshToken);
        setIsAuthenticated(true);
      })
      .catch(() => {
        logout();
      });
  }, []);
};
