import { type VerifyOTPBody } from '../types/auth';
import { verifyOTP } from '../services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useVerifyOTPMutation: MutationHandler<boolean, VerifyOTPBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['verify-otp'],
    mutationFn: async (body) => {
      const res = await verifyOTP(body);
      return res;
    },
    ...options,
  });
};
