import { forgotPassword } from '@/features/forgot-password/services/auth-service';

describe('forgotPassword', () => {
  it('should return true on successful forgotPassword', async () => {
    const body = { email: 'user' };
    const res = await forgotPassword(body);
    expect(res).toBe(true);
  });

  it('should throw error message on failed forgotPassword', async () => {
    expect.assertions(1);
    try {
      const body = { email: 'user' };
      await forgotPassword(body);
    } catch (err) {
      expect((err as Error).message).toMatch('Invalid email');
    }
  });
});
