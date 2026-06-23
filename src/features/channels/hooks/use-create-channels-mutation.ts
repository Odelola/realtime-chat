import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChannel } from "@/features/channels/services/channel-services";
import { CreateChannelBody } from "../types/channel";

export const useCreateChannelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      guildId,
      body,
    }: {
      guildId: string;
      body: CreateChannelBody;
    }) => createChannel(guildId, body),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["channels", variables.guildId],
      });
    },
  });
};