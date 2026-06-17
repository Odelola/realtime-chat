import { create } from 'zustand';
import { logger } from './logger';
import { setItem } from '@/lib/local-storage';

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  logger<AuthState>(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated });
      },
      setTokens: (accessToken, refreshToken) => {
        setItem('token', accessToken);
        set({ accessToken, refreshToken });
      },
      logout: () => {
        window.localStorage.removeItem('token');
        set({ isAuthenticated: false, accessToken: null, refreshToken: null });
      },
    }),
    'authStore'
  )
);

export default useAuthStore;
