import { api } from '@/lib/api';
import { type VerifyEmailBody } from '@/features/verify-email/types/auth';

// Dummy verify email request that will resolve in 2 seconds
// export const verifyEmail = async (body: VerifyEmailBody) => {
//   const res = new Promise<boolean>((resolve, reject) => {
//     if (body.token !== '123456') {
//       reject(new Error('Invalid token.'));
//     }

//     setTimeout(() => {
//       resolve(true);
//     }, 2000);
//   });
//   return await res;
// };

export const verifyEmail = async (body: VerifyEmailBody) => {
  const response = await api.post('/auth/verify', body);
  return response;
};
