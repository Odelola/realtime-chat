import { type OnboardingBody } from '@/features/onboarding/types/auth';

// Dummy onboarding request that will resolve in 2 seconds
export const onboarding = async (body: OnboardingBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    if (
      body.workspace_name !== 'user' ||
      body.display_name !== 'user' ||
      body.role !== 'user'
    ) {
      reject(new Error('Invalid details'));
    }

    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};
