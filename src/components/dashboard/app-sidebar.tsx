import{
Sidebar,
SidebarContent,
SidebarGroup,
SidebarGroupContent,
SidebarMenu,
SidebarMenuItem,
SidebarMenuButton,
SidebarHeader
} from "@/components/ui/sidebar"
import {useMyGuildsQuery} from "@/features/guild/hooks/use-guilds-query"

import{
  Hash,
 MessageSquare,
  Users
} from "lucide-react"
import CreateGuildModal from "@/features/guild/guild-modal/create-guild-modal"
import { useState } from "react"
import { useGuildChannelsQuery } from "@/features/channels/hooks/use-channels-query"
import CreateChannelModal from "@/features/channels/channel-modal/create-channel-modal";
import JoinGuildModal from "@/features/guild/guild-modal/join-guild-modal";
import useChatStore from "@/store/chat-store";
export default function AppSidebar() {
  const[showCreateGuild, setShowCreateGuild] = useState(false)
  const [selectedGuildId, setSelectedGuildId] = useState<string>();
  const { data: guilds, isLoading } = useMyGuildsQuery();
  const { data: channels } =
  useGuildChannelsQuery(selectedGuildId ?? "");
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showJoinGuild,setShowJoinGuild] = useState(false);
  const { selectedChannelId, setSelectedChannelId } = useChatStore();
 
  return(
     <Sidebar
  collapsible="none"
  className="w-[80px] md:w-[240px] bg-[#0B0B14] border-r border-white/10"
>

     <SidebarHeader className="p-3 md:p-6 border-b border-white/10 bg-[#0B0B14]" >
    
        <div className="flex flex-col items-center justify-center">
  <span className="w-14 h-14 md:w-24 md:h-24 rounded-full mb-2 md:mb-4 bg-[#1A1A2E]" />

  <h1 className="text-sm md:text-xl font-bold hidden lg:block text-white">
    Nexus Slate
  </h1>

  <p className="text-xs text-gray-400 uppercase -tracking-widest hidden md:block">
    Workspace
  </p>

  <button
    onClick={() => setShowCreateGuild(true)}
    className="mt-4 px-3 py-2 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
  >
    Create Guild
  </button>

  <button
  onClick={() => setShowJoinGuild(true)}
  className="mt-2 px-3 py-2 text-xs bg-indigo-600 text-white rounded-md"
>
  Join Guild
</button>
</div>
     </SidebarHeader>
     <SidebarContent className="bg-[#0B0B14]">
      <SidebarGroup>
  <p className="px-2 mb-2 text-xs text-gray-500">
    GUILDS
  </p>

  <SidebarGroupContent>
    <SidebarMenu>
      {isLoading ? (
        <p className="px-2 text-sm text-gray-400">
          Loading...
        </p>
      ) : guilds?.length ? (
        guilds.map((guild) => (
          <SidebarMenuItem key={guild.id}>
            <SidebarMenuButton className="text-white hover:bg-white/5 hover:text-white" onClick={() => setSelectedGuildId(guild.id)}>
              <Users size={16} />

              <span className="truncate">
                {guild.name}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))
      ) : (
        <div className="px-2 py-4 text-center">
          <p className="text-sm text-gray-500">
            No guilds yet
          </p>

          <button
            onClick={() => setShowCreateGuild(true)}
            className="mt-2 text-xs text-indigo-400 hover:text-indigo-300"
          >
            Create your first guild
          </button>
        </div>
      )}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
{selectedGuildId &&  (
  <SidebarGroup>
  <div className="flex items-center justify-between px-2 mt-4 mb-2">
      <p className="text-xs text-gray-500">
        CHANNELS
      </p>

      <button
        onClick={() => setShowCreateChannel(true)}
        className="text-indigo-400 text-xs"
      >
        +
      </button>
    </div>
  <SidebarGroupContent>
   <SidebarMenu>
  {channels?.length ? (
    channels.map((channel) => (
      <SidebarMenuItem key={channel.id}>
        <SidebarMenuButton
          className={`text-white ${selectedChannelId === channel.id ? 'bg-white/10' : ''}`}
          onClick={() => setSelectedChannelId(channel.id)}
        >
          <Hash size={16} />
          <span>{channel.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))
  ) : (
    <div className="px-2 py-2">
      <p className="text-xs text-gray-500">
        No channels yet
      </p>
    </div>
  )}
</SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
)}
        <SidebarGroup>
          <p className="px-2 mt-6 mb-2 text-xs text-gray-500 hidden lg:inline">DIRECT MESSAGES</p>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MessageSquare size={16} className="text-blue-600" />
                  <span className="text-xs text-gray-400  bg-white/2">Torera Solomon</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MessageSquare size={16}className="text-blue-600"  />
                  <span className="text-xs text-gray-400  bg-white/2">Jasmine Solomon</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
          
     </SidebarContent>  
     <CreateGuildModal
  isOpen={showCreateGuild}
  onClose={() => setShowCreateGuild(false)}
  
/>
<CreateChannelModal
  isOpen={showCreateChannel}
  onClose={() => setShowCreateChannel(false)}
  guildId={selectedGuildId!}
/>

<JoinGuildModal
  isOpen={showJoinGuild}
  onClose={() => setShowJoinGuild(false)}
  onGuildJoined={(guildId) => setSelectedGuildId(guildId)}
/>
     </Sidebar>
  )
}