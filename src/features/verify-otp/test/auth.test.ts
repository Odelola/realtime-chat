import { verifyOTP } from '@/features/verify-otp/services/auth-service';

describe('verifyOTP', () => {
  it('should return true on successful verifyOTP', async () => {
    const body = { otpCode: '123456', email: 'abcd' };
    const res = await verifyOTP(body);
    expect(res).toBe(true);
  });

  it('should throw error message on failed verifyOTP', async () => {
    expect.assertions(1);
    try {
      const body = { otpCode: '123456', email: 'abcd' };
      await verifyOTP(body);
    } catch (err) {
      expect((err as Error).message).toMatch('Invalid OTP code.');
    }
  });
});
