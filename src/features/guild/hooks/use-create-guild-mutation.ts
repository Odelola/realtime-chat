import { useMutation } from '@tanstack/react-query';
import { type MutationHandler } from '@/lib/react-query';
import { createGuild } from '../services/guild-service';
import { type CreateGuildBody, type Guild } from '../types/guild';

export const useCreateGuildMutation: MutationHandler<
  Guild,
  CreateGuildBody
> = (options) => {
  return useMutation({
    mutationKey: ['create-guild'],
    mutationFn: async (body) => {
      const res = await createGuild(body);
      return res;
    },
    ...options,
  });
};