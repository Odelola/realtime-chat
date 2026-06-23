import { api } from '@/lib/api';
import { type Channel } from '../types/channel';
import { CreateChannelBody } from "../types/channel";

export const getGuildChannels = async (
  guildId: string
): Promise<Channel[]> => {
  const response = await api.get(
    `/channels/${guildId}`
  );

  return response.data;
};



export const createChannel = async (
  guildId: string,
  body: CreateChannelBody
) => {
  const response = await api.post(
    `/channels/${guildId}`,
    body
  );

  return response.data;
};