import { signup } from '@/features/signup/services/auth-service';

describe('signup', () => {
  it('should return true on successfull signup', async () => {
    const body = { name: 'user', email: 'user', password: 'user' };
    const res = await signup(body);
    expect(res).toBe(true);
  });

  it('should throw error message on failed signup', async () => {
    expect.assertions(1);
    try {
      const body = { name: 'user', email: 'user', password: 'wrong' };
      await signup(body);
    } catch (err) {
      expect((err as Error).message).toMatch('Invalid name, email or password');
    }
  });
});
