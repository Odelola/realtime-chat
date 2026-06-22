import { api } from '@/lib/api';
import { type VerifyEmailBody } from '@/features/verify-email/types/auth';

export const verifyEmail = async (body: VerifyEmailBody) => {
  const response = await api.post('/auth/verify-email', body);
  return response.data;
};

export const resendVerifyEmail = async (email: string) => {
  const response = await api.post('/auth/verify-email/resend', null, {
    params: { email },
  });
  return response.data;
};
