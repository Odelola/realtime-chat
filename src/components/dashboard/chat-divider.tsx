import React from 'react'

type ChatDividerProps = {
  text: string;
}

const ChatDivider = ({ text }: ChatDividerProps) => {
  return (
    <div className=' relative my-4 flex items-center'>
      <div className='h-[1px] flex-1 bg-white/0'>
      <span className='px-4 text-xs text-gray-500'>
         {text}
      </span>

      <div className='h-[1px] flex-1 bg-white/10'>

      </div>

      </div>
      
    </div>
  )
}

export default ChatDivider