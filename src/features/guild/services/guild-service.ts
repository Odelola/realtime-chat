import { api } from '@/lib/api';
import { type CreateGuildBody, type Guild } from '../types/guild';

export const createGuild = async (
  body: CreateGuildBody
): Promise<Guild> => {
  const response = await api.post('/guilds', body);

  return response.data;
};

export const getMyGuilds = async (): Promise<Guild[]> => {
  const response = await api.get('/guilds/my');
  return response.data;
};


import { PublicGuildResponse } from "../types/guild";


export const getPublicGuilds = async () => {
  const response = await api.get<PublicGuildResponse>(
    "/guilds/my/public"
  );

  return response.data;
};


export const joinGuild = async (guildId:string) => {
  const response = await api.post(
    `/guilds/${guildId}/join`
  );

  return response.data;
};