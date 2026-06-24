export type ChannelType =
  | 'TEXT'
  | 'VOICE'
  | 'ANNOUNCEMENT';

export interface Channel {
  id: string;
  name: string;
  topic: string;
  type: ChannelType;
  position: number;
  nsfw: boolean;
  guildId: string;
}

export type CreateChannelBody = {
  name: string;
  topic: string;
  type: "TEXT";
  position: number;
  nsfw: boolean;
};

