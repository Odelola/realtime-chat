import { api } from '@/lib/api';

export interface PresenceData {
  userId: string;
  online: boolean;
}

export async function getGuildPresence(guildId: string): Promise<PresenceData[]> {
  const response = await api.get<PresenceData[]>(
    `/guilds/${guildId}/presence`
  );
  return response.data;
}
