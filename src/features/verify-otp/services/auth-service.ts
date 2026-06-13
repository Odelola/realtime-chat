import { type VerifyOTPBody } from '@/features/verify-otp/types/auth';

// Dummy verify otp request that will resolve in 2 seconds
export const verifyOTP = async (body: VerifyOTPBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    if (body.otpCode !== '123456') {
      reject(new Error('Invalid OTP code.'));
    }

    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};
