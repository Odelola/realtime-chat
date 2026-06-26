import { useState, useEffect, useMemo } from 'react';
import useChatStore from '@/store/chat-store';
import { useGuildChannelsQuery } from '@/features/channels/hooks/use-channels-query';
import { PresenceData, getGuildPresence } from '@/services/presence-api-service';

type Props = {
  onClose?: () => void;
};

const ChannelSiderbar = ({ onClose }: Props) => {
  const { selectedGuildId, selectedChannelId } = useChatStore();
  const { data: channels = [] } = useGuildChannelsQuery(selectedGuildId ?? '');
  const [presence, setPresence] = useState<PresenceData[]>([]);
  const [loading, setLoading] = useState(false);

  const currentChannel = useMemo(() => {
    return channels.find((ch) => ch.id === selectedChannelId);
  }, [channels, selectedChannelId]);

  useEffect(() => {
    if (!selectedGuildId) return;

    setLoading(true);
    getGuildPresence(selectedGuildId)
      .then((data: PresenceData[]) => {
        setPresence(data);
      })
      .catch((err: Error) => {
        console.error('Failed to fetch presence:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedGuildId]);

  return (
    <aside className="h-screen w-[280px] sm:w-[320px] bg-[#0D0D18] p-6 border-l border-white/10">
      <div className='flex items-center justify-between border-b border-white/10'>
        <h2 className='w-100 flex items-center justify-between mb-4 text-white'>
          Channel Details
          <button className='text-gray-400' onClick={onClose}>
            X
          </button>
        </h2>
      </div>

      <div className='border-b border-white/10 p-2'>
        <p className='text-xs uppercase text-gray-500 mb-2'>About</p>
        <p className='text-gray-400 text-sm leading-6'>
          {currentChannel?.topic || 'No description available for this channel.'}
        </p>
      </div>

      <div className='pt-6'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-xs uppercase text-gray-500'>Members</p>
          <span className='text-gray-400 text-sm'>{presence.length}</span>
        </div>

        {loading ? (
          <p className='text-gray-500 text-xs'>Loading members...</p>
        ) : presence.length > 0 ? (
          <div className='space-y-4'>
            {presence.map((user) => (
              <div key={user.userId} className='flex items-center gap-3'>
                <div className={`w-2 h-2 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-500'}`} />
                <div>
                  <p className='text-white text-sm'>{user.userId}</p>
                  <p className='text-gray-500 text-xs'>{user.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500 text-xs'>No members found</p>
        )}
      </div>
    </aside>
  );
};

export default ChannelSiderbar; 
