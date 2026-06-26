import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;
let connectPromise: Promise<Client> | null = null;

export function connect(token: string): Promise<Client> {
  // Return existing connection promise if already connecting
  if (connectPromise) {
    return connectPromise;
  }

  connectPromise = new Promise((resolve, reject) => {
    // Remove quotes if they exist
    let cleanToken = token;
    if (cleanToken.startsWith(`"`)) {
      cleanToken = cleanToken.slice(1, -1);
    }

    const wsServerUrl = import.meta.env.VITE_WS_URL;
    const sockJsUrl = `${wsServerUrl}/ws?token=${encodeURIComponent(cleanToken)}`;

    stompClient = new Client({
      webSocketFactory: () => {
        return new SockJS(sockJsUrl);
      },
      connectHeaders: {
        Authorization: `Bearer ${cleanToken}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('✅ STOMP connected');
        connectPromise = null;
        resolve(stompClient!);
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame.headers['message']);
        connectPromise = null;
        reject(new Error(frame.headers['message']));
      },
      onDisconnect: () => {
        console.log('🔌 STOMP disconnected');
        connectPromise = null;
      },
    });

    stompClient.activate();
  });

  return connectPromise;
}

export function subscribeToChannel(channelId: string, onMessage: (message: any) => void) {
  if (!stompClient || !stompClient.connected) {
    throw new Error(`STOMP not connected. Client: ${stompClient ? `exists, connected: ${stompClient.connected}` : `null`}`);
  }

  return stompClient.subscribe(`/group/channel/${channelId}`, (message) => {
    const payload = JSON.parse(message.body);
    onMessage(payload);
  });
}

export function sendMessage(
  channelId: string,
  content: string,
  replyToId: string | null = null
) {
  if (!stompClient?.connected) {
    throw new Error(`STOMP not connected`);
  }

  let token = localStorage.getItem(`token`);
  // Remove quotes if they exist
  if (token && token.startsWith(`"`)) {
    token = token.slice(1, -1);
  }

  stompClient.publish({
    destination: `/app/chat/${channelId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content,
      replyToId,
      attachmentUrl: null,
    }),
  });
}

export function disconnect() {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
}

export function isConnected(): boolean {
  return stompClient?.connected ?? false;
}
