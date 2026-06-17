import { api } from '@/lib/api';
import { type LoginBody, type LoginResponse } from '@/features/login/types/auth';

export const login = async (body: LoginBody): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', body);
  return response.data;
};
