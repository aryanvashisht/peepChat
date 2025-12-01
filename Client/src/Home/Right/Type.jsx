import React from 'react'
import { IoSend } from 'react-icons/io5'
import useSendMessage from '../../context/useSendMessage'

function Type() {
  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = React.useState("")

  const handleSendMessage = async () => { 
    console.log("type:",message);
    await sendMessage(message);
    setMessage("");
  }

  return (
    <div className='flex px-2 py-1 h-[6vh]'>
      <input
        type="text"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Send message"
        className="input w-[98%] border border-gray-700 bg-gray-900" />
      <IoSend className='text-4xl p-0.5 ml-1 hover:p-1 rounded text-blue-600' onClick={handleSendMessage} />
    </div>
  )
}

export default Type
