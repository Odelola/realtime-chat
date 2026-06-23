import { useQuery } from "@tanstack/react-query";
import { getPublicGuilds } from "../services/guild-service";


export const usePublicGuildsQuery = () => {
  return useQuery({
    queryKey: ["public-guilds"],
    queryFn: getPublicGuilds,
  });
};