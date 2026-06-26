import { create } from 'zustand';
import { getItem, setItem } from '@/lib/local-storage';
import { logger } from './logger';

type ChatState = {
  selectedChannelId: string | undefined;
  setSelectedChannelId: (channelId: string | undefined) => void;
};

const useChatStore = create<ChatState>()(
  logger<ChatState>(
    (set) => ({
      selectedChannelId: getItem('selectedChannelId'),
      setSelectedChannelId: (channelId: string | undefined) => {
        setItem('selectedChannelId', channelId);
        set({ selectedChannelId: channelId });
      },
    }),
    'chatStore'
  )
);

export default useChatStore;
