import { type OnboardingBody } from '@/features/onboarding/types/auth';
import { onboarding } from '@/features/onboarding/services/auth-service';
import { type MutationHandler } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useOnboardingMutation: MutationHandler<boolean, OnboardingBody> = (
  options
) => {
  return useMutation({
    mutationKey: ['onboarding'],
    mutationFn: async (body) => {
      const res = await onboarding(body);
      return res;
    },
    ...options,
  });
};
