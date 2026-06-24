import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGuild } from "../services/guild-service";

export const useJoinGuildMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (guildId: string) => joinGuild(guildId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guilds"],
      });

      queryClient.invalidateQueries({
        queryKey: ["public-guilds"],
      });
    },
  });
};