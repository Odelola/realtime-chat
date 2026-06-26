import { useRef, useEffect } from 'react';
import ChatDivider from './chat-divider';
import ChatMessage from './chat-message';
import MessageInput from './message-input';
import { useChat } from '@/hooks/use-chat';
import useChatStore from '@/store/chat-store';
import useAuthStore from '@/store/auth-store';

const ChatArea = () => {
  const { selectedChannelId } = useChatStore();
  const { messages, connected, send, loading, error, retry, isOnline } = useChat(selectedChannelId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  if (!selectedChannelId) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#0B0B0B12]">
        <p className="text-lg text-gray-400">Select a channel to start chatting</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#0B0B0B12]">
        <p className="text-gray-400">Loading messages...</p>
      </div>
    );
  }

  const userId = accessToken ? JSON.parse(atob(accessToken.split('.')[1])).sub : null;

  return (
    <div className="flex h-full flex-col bg-[#0B0B0B12] min-w-0">
      {!isOnline && (
        <div className="border-b border-[#FF6B6B]/50 bg-[#FF6B6B]/15 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
            <p className="text-sm font-medium text-[#FF6B6B]">You are offline - reconnect to send messages</p>
          </div>
        </div>
      )}

      {isOnline && error && (
        <div className="border-b border-[#FF6B6B]/30 bg-[#FF6B6B]/10 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
              <p className="text-sm text-[#FF6B6B]">{error}</p>
            </div>
            <button
              onClick={retry}
              className="whitespace-nowrap rounded-lg bg-[#FF6B6B]/20 px-4 py-2 text-xs text-[#FF6B6B] hover:bg-[#FF6B6B]/30"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {isOnline && !connected && !error && (
        <div className="border-b border-[#9FA7FF]/30 bg-[#9FA7FF]/10 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#9FA7FF] animate-pulse" />
            <p className="text-sm text-[#9FA7FF]">Connecting to server...</p>
          </div>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
            <ChatDivider text="Today" />
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                username={message.authorUsername}
                time={new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                avatar={message.authorAvatar || 'https://i.pravatar.cc/150?img=default'}
                message={message.content}
                isOwnMessage={message.authorId === userId}
              />
            ))}
          </>
        )}
      </div>
      <MessageInput onSend={send} disabled={!connected} />
    </div>
  );
};

export default ChatArea;