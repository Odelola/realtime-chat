import { api } from '@/lib/api';
import { type SignupBody } from '@/features/signup/types/auth';

// Dummy login request that will resolve in 2 seconds
// export const signup = async (body: SignupBody) => {
//   const res = new Promise<boolean>((resolve, reject) => {
//     if (
//       body.name !== 'user' ||
//       body.email !== 'user' ||
//       body.password !== 'user'
//     ) {
//       reject(new Error('Invalid name, email or password'));
//     }

//     setTimeout(() => {
//       resolve(true);
//     }, 2000);
//   });
//   return await res;
// };

export const signup = async (body: SignupBody) => {
  const response = await api.post('/auth/register', body);
  return response;
};
