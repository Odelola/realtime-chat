import { type VerifyEmailBody } from '@/features/verify-email/types/auth';
import { verifyEmail } from '@/features/verify-email/services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useVerifyEmailMutation: MutationHandler<boolean, VerifyEmailBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['verify-email'],
    mutationFn: async (body) => {
      await verifyEmail(body);
      return true;
    },
    ...options,
  });
};
