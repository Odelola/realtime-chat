import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const ChatTabs = () => {
  return (
   

    <div className="flex items-center gap-3 md:gap-6">

  <h1 className="text-white  font-semibold">
    # general
  </h1>

    
      <TabsList variant= 'line' className=" hidden sm:flex gap-4 md:gap-6  bg-transparent p-0"> 

        <TabsTrigger value="chat" className="px-0 py-2 text-[#6B6B85] data-[state=active]:text-[#8B5CF6]">
          Chat</TabsTrigger>

        <TabsTrigger value= 'files' className="px-0 py-2 text-[#6B6B85] data-[state=active]:text-[#8B5CF6]">Files</TabsTrigger>

        <TabsTrigger value='mentions' className="px-0 py-2 text-[#6B6B85] data-[state=active]:text-[#8B5CF6]">Mentions</TabsTrigger>
        
      </TabsList>


    
    </div>
   
  )
}

export default ChatTabs