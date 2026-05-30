import React from 'react'
import{ Plus, Smile, SendHorizonal } from 'lucide-react'
const MessageInput = () => {
  return (
    <div className='border-t border-white/10 p-3 sm:p-5'>

      <div className='flex items-center gap-2 sm:gap-4 rounded-2xl bg-[#171722] px-4 py-3'>
       <button className='text-gray-500 hover:text-white'>
        <Plus size={18}/>
       </button>
        
        <input type='text' placeholder='Message #general' className='flex-1 bg-transparent text-sm text-white outline-none placeholder:text-500' />

        <button className='text-gray-500 hover:text-white'>
          <Smile size={18}/>
        </button>

        <button className='text-gray-500 hover:text-white'>
          <SendHorizonal size={18}/>
        </button>
      </div>

    </div>
  )
}

export default MessageInput