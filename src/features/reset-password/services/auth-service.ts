import { api } from '@/lib/api';
import { type ResetPasswordBody } from '../types/auth';

export const resetPassword = async (body: ResetPasswordBody) => {
  const response = await api.post('/auth/reset-password', body);
  return response.data;
};
