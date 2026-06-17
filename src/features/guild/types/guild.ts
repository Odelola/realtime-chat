export interface CreateGuildBody {
  name: string;
  description: string;
  iconUrl: string;
}

export interface Guild {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
}