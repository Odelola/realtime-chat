import React from 'react'
import ChatDivider from './chat-divider'
import ChatMessage from './chat-message'
import MessageInput from './message-input'

const ChatArea = () => {
  return (
    <div className='flex h-full flex-col bg-[#0B0B0B12] min-w-0'>

      <div className='flex-1 overflow-y-auto py-6'>

        <ChatDivider text='Today' />

        <ChatMessage username='Torera Solomon'
        time='12:00 pm'
        avatar='/images/my headshot.png'
        message='Hey everyone! I just finished the new dashboard designs.'
          isOwnMessage/>

         <ChatMessage username='Jasmine Solomon'
        time='2:15 pm'
        avatar='"https://i.pravatar.cc/150?img=12'
        message='Looks really clean. I especially love the sidebar spacing and dark theme consistency.
        '/>


 <ChatMessage username='John Well'
        time='3:00 pm'
        avatar='https://i.pravatar.cc/150?img=15'
        message='I’ll connect the websocket logic later today so we can start testing real-time messaging.
        '/>


      </div>
       <MessageInput />
    </div>
  )
}

export default ChatArea