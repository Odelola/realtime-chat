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

import{
  Hash,
 MessageSquare,
  Users
} from "lucide-react"

export default function AppSidebar() {
  return(
     <Sidebar
  collapsible="none"
  className="w-[80px] md:w-[240px] bg-[#0B0B14] border-r border-white/10"
>

     <SidebarHeader className="p-3 md:p-6 border-b border-white/10 bg-[#0B0B14]" >
    
        <div className="flex flex-col items-center justify-center ">
           <span className="w-14 h-14 md:w-24 md:h-24 rounded-full mb-2 md:mb-4 bg-[#1A1A2E]"></span>

          <h1 className="text-sm md:text-xl font-bold hidden lg:block text-white">Nexus Slate</h1>
          <p className="text-xs text-gray-400 uppercase -tracking-widest hidden md:block">Workspace</p>
        </div>
     </SidebarHeader>
     <SidebarContent className="bg-[#0B0B14]">
      <SidebarGroup>
        <p className="px-2 mb-1 md:text-xs text-[10px]text-gray-500">CHANNELS</p>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-white py-2 bg-white/5">
                <Hash size={16}/>
                <span className="truncate">general</span>

                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
              <SidebarMenuButton className="text-white bg-white/5">
                <Hash size={16}/>
                <span className="truncate">design</span>

                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
              <SidebarMenuButton className="text-white bg-white/5">
                <Hash size={16}/>
                <span className="truncate">dev-team</span>

                </SidebarMenuButton>
              </SidebarMenuItem>

              </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
        
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
     </Sidebar>
  )
}