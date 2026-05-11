import { type VerifyOTPBody } from '../types/auth';

// Dummy verify otp request that will resolve in 2 seconds
export const verifyOTP = async (body: VerifyOTPBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    if (body.otp !== '123456') {
      reject(new Error('Invalid OTP'));
    }

    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};
