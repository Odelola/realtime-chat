import { api } from '@/lib/api';
import { type ForgotPasswordBody } from '@/features/forgot-password/types/auth';

// Dummy forgot password request that will resolve in 2 seconds
// export const forgotPassword = async (body: ForgotPasswordBody) => {
//   const res = new Promise<boolean>((resolve, reject) => {
//     if (body.email !== 'user') {
//       reject(new Error('Invalid email'));
//     }

//     setTimeout(() => {
//       resolve(true);
//     }, 2000);
//   });
//   return await res;
// };
export const forgotPassword = async (body: ForgotPasswordBody) => {
  const response = await api.post('/auth/forgot-password', body);
};
