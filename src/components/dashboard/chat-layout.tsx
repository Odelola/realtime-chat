import React, { useState } from 'react';
import AppSidebar from './app-sidebar';
import ChannelHeader from './channel-header';
import ChannelSidebar from './channel-sidebar';
import ChatArea from './chat-area';
import {Tabs, TabsContent } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom';

const ChatLayout = () => {
  const [showChannelSidebar, setShowChannelSidebar] = useState(false);
  const navigate = useNavigate();
 
  return (
    <div className="flex h-screen w-full bg-[#0B0B12] overflow-hidden">

      <AppSidebar />

      <div className="flex flex-1 flex-col min-w-0">

        <Tabs defaultValue='chat' className='flex h-full flex-col'>

        <ChannelHeader 
       
        toggleSidebar ={() =>setShowChannelSidebar(!showChannelSidebar)} />

        <TabsContent value='chat' 
        className='flex-1 mt-0 overflow-hidden '>

             <ChatArea />
        </TabsContent>
           
           <TabsContent
            value="files"
            className="flex-1 mt-0"
          >
            <div className="p-4 text-white">
              Files coming soon...
            </div>
          </TabsContent>
       
        <TabsContent
            value="mentions"
            className="flex-1 mt-0"
          >
            <div className="p-4 text-white">
              No mentions yet
            </div>
          </TabsContent>
          
        </Tabs>
      </div>

      <div className='hidden lg:flex'>
         <ChannelSidebar />
      </div>

      {showChannelSidebar && (
         <div className= "fixed inset-0 z-50 bg-black/50 lg-hidden">
          <div className="absolute right-0 top-0 h-full">
           <ChannelSidebar 
           onClose={() => setShowChannelSidebar(false)} />
          </div>
          </div>
      )}
     
    </div>
  );
};

export default ChatLayout;
