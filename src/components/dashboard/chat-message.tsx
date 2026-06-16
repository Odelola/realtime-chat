import React from 'react'

type ChatMesageProps = {
  username: string;
  message: string;
  time: string;
  avatar: string;
  isOwnMessage?: boolean;
}

const ChatMessage = ({
  username,
  message,
  time,
  avatar,
  isOwnMessage = false
}: ChatMesageProps) => {
  return (
    <div className= {`flex  px-6 py-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>

       <div
        className={`flex max-w-[85%] sm:max-w-[75%] lg:max-w-2xl gap-3 ${
          isOwnMessage ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
          <img
        src={avatar}
        alt={username}
        className='h-11 w-11 rounded-full object-cover'
        />

    
       
       <div
          className={`flex flex-col ${
            isOwnMessage ? 'items-end' : 'items-start'
          }`}
        >

          <div className='flex items-center gap-2 '>
            <h3 className='text-sm font-semibold text-blue-400'>
              {isOwnMessage ? 'You' : username}
            </h3>
            <span className='text-xs text-gray-500 '>
              {time}
            </span>
          </div>

          <p className={`w-fit max-w-full break-words rounded-2xl p-3 text-sm leading-7 text-gray-200 ${
  isOwnMessage
    ? 'bg-blue-500/20'
    : 'bg-white/10'
}`}>
            {message}
          </p>

        </div>
    </div>
    </div>
  )
}

export default ChatMessage