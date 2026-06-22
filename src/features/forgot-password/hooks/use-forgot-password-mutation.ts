import { type ForgotPasswordBody } from '@/features/forgot-password/types/auth';
import { forgotPassword } from '@/features/forgot-password/services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useForgotPasswordMutation: MutationHandler<
  boolean,
  ForgotPasswordBody
> = (options) => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (body) => {
      await forgotPassword(body);
      return true;
    },
    ...options,
  });
};
