import { api } from '@/lib/api';
import { type VerifyOTPBody, type VerifyOTPResponse } from '@/features/verify-otp/types/auth';

export const verifyOTP = async (body: VerifyOTPBody): Promise<VerifyOTPResponse> => {
  const response = await api.post<VerifyOTPResponse>('/auth/verify-otp', body);
  return response.data;
};
