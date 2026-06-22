import { api } from './api';

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await api.post<{ accessToken: string; expirationTime: number }>(
    '/auth/refresh',
    { refreshToken }
  );
  return response.data;
};

export const logoutUser = async (refreshToken: string) => {
  const response = await api.post<{ message: string }>('/auth/logout', { refreshToken });
  return response.data;
};
