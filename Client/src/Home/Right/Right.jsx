import React from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import Type from './Type'
import useConversation from '../../statemanagement/useConversation';

function Right() {
  const {selectedConversation} = useConversation();

  return (
  selectedConversation ? (  <div className='w-[70%] border border-gray-800 bg-stone-950'>
      <ChatUser />
      <div className='overflow-y-auto' style={{ maxHeight: "calc(92vh - 9vh)" }}>
        <Messages />
      </div>
      <Type />
    </div>) :( <div className='w-[70%] border border-gray-800 bg-stone-950 flex justify-center items-center h-screen'>
      <h1 className='text-gray-500 text-2xl'>Select a conversation to start chatting</h1>
    </div>)
  )
}

export default Right
