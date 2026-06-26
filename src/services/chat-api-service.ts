import { api } from '@/lib/api';

export interface MessageResponse {
  id: string;
  content: string;
  authorId: string;
  authorUsername: string;
  authorAvatar?: string;
  channelId: string;
  createdAt: string;
  updatedAt?: string;
  replyToId?: string;
  deletedAt?: string;
}

export interface PagedMessages {
  content: MessageResponse[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
}

export async function getChannelMessages(
  channelId: string,
  page = 0,
  size = 50
): Promise<PagedMessages> {
  const response = await api.get<PagedMessages>(
    `/channels/${channelId}/messages`,
    {
      params: { page, size },
    }
  );
  return response.data;
}

export async function getMessagesBefore(
  channelId: string,
  before: string,
  size = 50
): Promise<MessageResponse[]> {
  const response = await api.get<MessageResponse[]>(
    `/channels/${channelId}/messages/before`,
    {
      params: {
        before: encodeURIComponent(before),
        size,
      },
    }
  );
  return response.data;
}
