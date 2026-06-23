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

export interface Guild {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  ownerId: string;
  public: boolean;
}

export interface PublicGuild {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  ownerId: string;
  public: boolean;
}


export interface PublicGuildResponse {
  content: PublicGuild[];
  totalElements: number;
  totalPages: number;
}