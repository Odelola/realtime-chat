import { type ForgotPasswordBody } from '../types/auth';
import { forgotPassword } from '../services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useForgotPasswordMutation: MutationHandler<
  boolean,
  ForgotPasswordBody
> = (options) => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (body) => {
      const res = await forgotPassword(body);
      return res;
    },
    ...options,
  });
};
