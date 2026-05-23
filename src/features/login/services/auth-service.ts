import { api } from '@/lib/api';
import { type LoginBody } from '../types/auth';

// Dummy login request that will resolve in 2 seconds
// export const login = async (body: LoginBody) => {
//   const res = new Promise<boolean>((resolve, reject) => {
//     if (body.email !== 'user' || body.password !== 'user') {
//       reject(new Error('Invalid email or password'));
//     }

//     setTimeout(() => {
//       resolve(true);
//     }, 2000);
//   });
//   return await res;
// };

export const login = async (body: LoginBody) => {
  const response = await api.post('/auth/login', body);
  console.log(response);
};
