import { useQuery } from '@tanstack/react-query';
import { getMyGuilds } from '../services/guild-service';

export const useMyGuildsQuery = () => {
  return useQuery({
    queryKey: ['guilds'],
    queryFn: getMyGuilds,
  });
};