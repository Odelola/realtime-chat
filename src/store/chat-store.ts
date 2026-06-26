import { create } from 'zustand';
import { getItem, setItem } from '@/lib/local-storage';
import { logger } from './logger';

type ChatState = {
  selectedChannelId: string | undefined;
  selectedChannelName: string | undefined;
  selectedGuildId: string | undefined;
  setSelectedChannel: (channelId: string | undefined, channelName?: string, guildId?: string) => void;
};

const useChatStore = create<ChatState>()(
  logger<ChatState>(
    (set) => ({
      selectedChannelId: undefined,
      selectedChannelName: undefined,
      selectedGuildId: getItem('selectedGuildId'),
      setSelectedChannel: (channelId: string | undefined, channelName?: string, guildId?: string) => {
        setItem('selectedChannelId', channelId);
        setItem('selectedChannelName', channelName);
        setItem('selectedGuildId', guildId);
        set({
          selectedChannelId: channelId,
          selectedChannelName: channelName,
          selectedGuildId: guildId,
        });
      },
    }),
    'chatStore'
  )
);

export default useChatStore;
