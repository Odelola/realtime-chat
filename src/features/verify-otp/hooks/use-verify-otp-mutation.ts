import { type VerifyOTPBody } from '@/features/verify-otp/types/auth';
import { verifyOTP } from '@/features/verify-otp/services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useVerifyOTPMutation: MutationHandler<boolean, VerifyOTPBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['verify-otp'],
    mutationFn: async (body) => {
      const res = await verifyOTP(body);
      return true;
    },
    ...options,
  });
};
