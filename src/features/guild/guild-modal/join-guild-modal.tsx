import { usePublicGuildsQuery } from "../hooks/use-public-guild-query";
import { useJoinGuildMutation } from "../hooks/use-join-guild-mutation";
import { useState } from "react";
import { X } from "lucide-react";

interface JoinGuildModalProps {
  isOpen:boolean;
  onClose:()=>void;
  onGuildJoined:(guildId:string)=>void;
}

export default function JoinGuildModal({
  isOpen,
  onClose,
  onGuildJoined,
}: JoinGuildModalProps) 

{

  const {data:guilds, isLoading} = usePublicGuildsQuery();

  const joinMutation = useJoinGuildMutation();
  const [errorMessage, setErrorMessage] = useState("");


  if(!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-md bg-[#11111d] border border-white/10 rounded-lg p-6">


       <div className="flex items-center justify-between mb-4">
        {errorMessage && (
  <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 p-3">

    <p className="text-sm text-red-400">
      {errorMessage}
    </p>

  </div>
)}

  <h2 className="text-white text-lg font-semibold">
    Join a Guild
  </h2>


  <button
    onClick={onClose}
    className="text-gray-400 hover:text-white"
  >
    <X size={20}/>
  </button>

</div>

        {isLoading && (
          <p className="text-gray-400">
            Loading guilds...
          </p>
        )}


        <div className="space-y-3">

        {guilds?.content?.map((guild)=>(
          
          <div
            key={guild.id}
            className="flex items-center justify-between bg-[#1a1a2e] p-3 rounded"
          >

            <div>

              <h3 className="text-white">
                {guild.name}
              </h3>

              <p className="text-xs text-gray-400">
                {guild.description}
              </p>

            </div>

<button
  onClick={() => {
    setErrorMessage("");

    joinMutation.mutate(guild.id, {
      onError: (error: any) => {

        const message =
          error?.response?.data?.message ||
          "Failed to join guild";

        setErrorMessage(message);
      },

      onSuccess: () => {
  onGuildJoined(guild.id);
  onClose();
},
    });
  }}
  disabled={joinMutation.isPending}
  className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
>
  {joinMutation.isPending ? "Joining..." : "Join"}
</button>

          </div>

        ))}

        </div>


        <button
          onClick={onClose}
          className="mt-5 text-gray-400 text-sm"
        >
          Close
        </button>


      </div>

    </div>
  )
}