import { create } from 'zustand';
import { logger } from './logger';
import { setItem, getItem } from '@/lib/local-storage';
import { logoutUser } from '@/lib/auth-api';

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
    (set, get) => ({
      isAuthenticated: !!getItem<string>('refreshToken'),
      accessToken: getItem<string>('token'),
      refreshToken: getItem<string>('refreshToken'),
      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated });
      },
      setTokens: (accessToken, refreshToken) => {
        setItem('token', accessToken);
        setItem('refreshToken', refreshToken);
        set({ accessToken, refreshToken });
      },
      logout: () => {
        const { refreshToken } = get();
        if (refreshToken) {
          logoutUser(refreshToken).catch(() => {});
        }
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('refreshToken');
        set({ isAuthenticated: false, accessToken: null, refreshToken: null });
      },
    }),
    'authStore'
  )
);

export default useAuthStore;
