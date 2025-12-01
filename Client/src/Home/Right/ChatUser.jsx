import React from 'react'
import useCoversation from '../../statemanagement/useConversation'
import { useSocketContext } from '../../context/socketcontext';

function ChatUser() {
    const {selectedConversation} = useCoversation();
    console.log(selectedConversation);
      const {  onlineUsers } = useSocketContext();
      const isOnline = onlineUsers?.includes(selectedConversation?._id);

    return (
        <div className='flex pl-5 space-x-8 h-[9vh] bg-gray-900 p-1'>
            <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
                <div className="w-15 rounded-full">
                    <img src={selectedConversation?.displayimage || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} />
                </div>
            </div>

            <div>
                <h1 className='font-semibold text-lg'>{selectedConversation?.name || "User"}</h1>
                <span className='text-sm'>{isOnline?"Online":"Last seen moments ago"}</span>
            </div>
        </div>
    )
}

export default ChatUser
