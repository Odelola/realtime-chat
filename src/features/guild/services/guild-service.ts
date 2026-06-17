import { api } from '@/lib/api';
import { type CreateGuildBody, type Guild } from '../types/guild';

export const createGuild = async (
  body: CreateGuildBody
): Promise<Guild> => {
  const response = await api.post('/api/v1/guilds', body);

  return response.data;
};