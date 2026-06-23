import { useQuery } from '@tanstack/react-query';
import  {getGuildChannels} from '@/features/channels/services/channel-services';

export const useGuildChannelsQuery = (
  guildId: string
) => {
  return useQuery({
    queryKey: ['channels', guildId],
    queryFn: () => getGuildChannels(guildId),
    enabled: !!guildId,
  });
};