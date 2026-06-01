import { type LoginBody } from '../types/auth';
import { login } from '../services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation: MutationHandler<boolean, LoginBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (body) => {
      await login(body);
      return true;
    },
    ...options,
  });
};
