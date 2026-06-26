import React from 'react'
import ChatTabs from './chat-tabs'
import { Search, Phone, MoreVertical, PanelRight } from 'lucide-react'
type ChannelHeaderProps = {
  toggleSidebar: () => void;
}

const ChannelHeader = ({ toggleSidebar }: ChannelHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#0a0a2e] px-3 py-3 sm:px-6">
      <ChatTabs />
      <div className='flex items-center gap-2 sm:gap-3'>
        <div className="flex items-center gap-2 rounded-md border border-white/20 bg-[#1a1a3e] px-3 py-1 h-10 w-[120px] sm:w-[180px] lg:w-[240px]">
          <Search size={20} className='text-gray-400' />
          <input className='text-gray-400 hover:text-white border-none outline-none w-[200px]' placeholder='Search...'
          />
        </div>

        <button className='text-gray-400 hover:text-white'>
          <Phone size={20} />
        </button>
        <button className='text-gray-400 hover:text-white'>
          <MoreVertical size={20} />
        </button>
        <button className="text-gray-400 hover:text-white lg:hidden" onClick={toggleSidebar}>
          <PanelRight size={20} />
        </button>
      </div>
    </div>
  )
}


export default ChannelHeader