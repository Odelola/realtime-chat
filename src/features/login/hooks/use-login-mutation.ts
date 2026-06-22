import { type LoginBody, type LoginResponse } from '@/features/login/types/auth';
import { login } from '@/features/login/services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation: MutationHandler<LoginResponse, LoginBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (body) => {
      const res = await login(body);
      return res;
    },
    ...options,
  });
};
