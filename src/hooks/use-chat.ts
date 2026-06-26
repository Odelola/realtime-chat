import { useState, useEffect, useRef, useCallback } from 'react';
import {
  connect,
  disconnect,
  subscribeToChannel,
  sendMessage,
  isConnected,
} from '@/services/websocket-service';
import { getChannelMessages, getMessagesBefore, MessageResponse } from '@/services/chat-api-service';

export function useChat(channelId?: string) {
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [connected, setConnected] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const subscriptionRef = useRef<any>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      if (mountedRef.current) {
        setIsOnline(true);
        setError(null);
      }
    };

    const handleOffline = () => {
      if (mountedRef.current) {
        setIsOnline(false);
        setConnected(false);
      }
    };

    window.addEventListener(`online`, handleOnline);
    window.addEventListener(`offline`, handleOffline);

    return () => {
      window.removeEventListener(`online`, handleOnline);
      window.removeEventListener(`offline`, handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!channelId) {
      setMessages([]);
      setConnected(false);
      return;
    }

    mountedRef.current = true;
    const token = localStorage.getItem('token');
    if (!token) {
      setError(`No authentication token found`);
      return;
    }

    setMessages([]);
    setHasMore(true);
    setLoading(true);

    async function init() {
      try {
        if (!mountedRef.current) return;
        setError(null);

        // Load initial messages
        const history = await getChannelMessages(channelId, 0, 50);
        if (!mountedRef.current) return;

        // Reverse so oldest is at top
        setMessages(history.content.reverse());
        setHasMore(!history.last);

        // Connect to WebSocket
        if (!isConnected()) {
          await connect(token);
        }

        // Verify connection is actually established
        if (!isConnected()) {
          throw new Error(`Connection failed: STOMP still not connected after connect() call`);
        }

        if (!mountedRef.current) return;

        // Subscribe to new messages
        subscriptionRef.current = subscribeToChannel(channelId, (msg) => {
          if (mountedRef.current) {
            setMessages((prev) => [...prev, msg]);
          }
        });

        setConnected(true);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : `Failed to connect`;
        console.error('Failed to initialize chat:', err);
        if (mountedRef.current) {
          setError(errorMsg);
          setConnected(false);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [channelId]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || messages.length === 0 || !channelId || !mountedRef.current) return;

    setLoadingMore(true);
    try {
      const oldest = messages[0].createdAt;
      const older = await getMessagesBefore(channelId, oldest, 50);

      if (!mountedRef.current) return;

      if (older.length === 0) {
        setHasMore(false);
      } else {
        // Reverse older messages and prepend
        setMessages((prev) => [...older.reverse(), ...prev]);
        if (older.length < 50) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error('Failed to load older messages:', err);
    } finally {
      if (mountedRef.current) {
        setLoadingMore(false);
      }
    }
  }, [channelId, messages, hasMore, loadingMore]);

  const send = useCallback(
    (content: string, replyToId: string | null = null) => {
      if (channelId && connected && content.trim()) {
        try {
          sendMessage(channelId, content.trim(), replyToId);
        } catch (err) {
          console.error('Failed to send message:', err);
        }
      }
    },
    [channelId, connected]
  );

  const retry = useCallback(async () => {
    if (!channelId || !mountedRef.current) return;

    const token = localStorage.getItem(`token`);
    if (!token) {
      setError(`No authentication token found`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Disconnect first to clear any stale state
      disconnect();

      // Wait a bit for disconnect to complete
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!mountedRef.current) return;

      // Connect fresh
      await connect(token);

      if (!mountedRef.current) return;

      // Subscribe to channel
      subscriptionRef.current = subscribeToChannel(channelId, (msg) => {
        if (mountedRef.current) {
          setMessages((prev) => [...prev, msg]);
        }
      });

      setConnected(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : `Failed to reconnect`;
      console.error('Failed to retry connection:', err);
      if (mountedRef.current) {
        setError(errorMsg);
        setConnected(false);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [channelId]);

  return {
    messages,
    connected,
    send,
    loadMore,
    hasMore,
    loadingMore,
    loading,
    error,
    retry,
    isOnline,
  };
}
