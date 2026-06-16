import React from 'react'
type Props = {
  onClose?: () => void;
}
const ChannelSiderbar = ({ onClose }: Props) => {
  return (
   <aside className="h-screen w-[280px] sm:w-[320px] bg-[#0D0D18] p-6 border-l border-white/10">

      <div className='flex items-center justify-between border-b border-white/10'>
        <h2 className='w-100 flex items-center justify-between mb-4 text-white'>Channel Details

          <button className='text-gray-400 ' onClick={onClose}>
          X
        </button>
        </h2>
        
      </div>

      <div className='border-b border-white/10 p-2' >
      <p className='text-xs uppercase text-gray-500 mb-2 '> About</p>

      <p className='text-gray-400 text-sm leading-6'>
         Primary discussion space for general announcements and project updates.
      </p>
      </div>

      <div className='pt-6'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-xs uppercase text-gray-500'>Members</p>

          <span className='text-gray-400 text-sm'>12</span>

        </div>

        <div className='space-y-4'>
          <div className=' flex  items-center gap-3'>
            <div className='w-2 h-2 rounded-full bg-green-500'/>
             
             <div>
                <p className='text-white text-sm'>Torera Solomon</p>
                <p className='text-gray-500 text-xs'>Online</p>
              </div>
          </div>

          <div className=' flex  items-center gap-3'>
            <div className='w-2 h-2 rounded-full bg-yellow-500'/>
             
             <div>
                <p className='text-white text-sm'>Jasmine Solomon</p>
                <p className='text-gray-500 text-xs'>Away</p>
              </div>
          </div>


        </div>
      </div>

    </aside>
  )
}

export default ChannelSiderbar 
