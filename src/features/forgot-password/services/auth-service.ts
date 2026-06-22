import { api } from '@/lib/api';
import { type ForgotPasswordBody } from '@/features/forgot-password/types/auth';

export const forgotPassword = async (body: ForgotPasswordBody) => {
  const response = await api.post('/auth/forgot-password', body);
  return response.data;
};
