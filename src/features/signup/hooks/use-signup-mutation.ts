import { type SignupBody } from '@/features/signup/types/auth';
import { signup } from '@/features/signup/services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useSignupMutation: MutationHandler<boolean, SignupBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async (body) => {
      const res = await signup(body);
      return res;
    },
    ...options,
  });
};
