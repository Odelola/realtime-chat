import { type ResetPasswordBody } from '@/features/reset-password/types/auth';
import { resetPassword } from '@/features/reset-password/services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useResetPasswordMutation: MutationHandler<boolean, ResetPasswordBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (body) => {
      await resetPassword(body);
      return true;
    },
    ...options,
  });
};
