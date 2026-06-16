import { login } from '@/features/login/services/auth-service';

describe('login', () => {
  it('should return true on successfull login', async () => {
    const body = { identifier: 'user', password: 'user' };
    const res = await login(body);
    expect(res).toBe(true);
  });

  it('should throw error message on failed login', async () => {
    expect.assertions(1);
    try {
      const body = { email: 'user', password: 'wrong' };
      await login(body);
    } catch (err) {
      expect((err as Error).message).toMatch('Invalid email or password');
    }
  });
});
