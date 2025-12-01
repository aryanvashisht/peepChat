import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage';
import useGetsocketMessage from "../../context/useGetsocketMessage"

function Messages() {
  const { messages, loading } = useGetMessage();
  console.log(messages);
  useGetsocketMessage();

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        console.log(lastMessageRef.current);
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }, [messages])

  return (
    <div className='px-6 pt-2' style={{ minHeight: "calc(92vh - 9vh)" }}>
      {
        loading
          ? <p className='content-center text-center duration-500 text-blue-400 font-semibold'>Wait while we load the conversation...</p>
          : messages?.length === 0 ? <p className='content-center text-center duration-500 text-gray-400 font-semibold'>No messages yet. Start the conversation!</p>
            : messages?.map((message, index) => (
              /* messages?.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))*/
              <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                <Message message={message} />
              </div>
            ))
      }
    </div>
  )
}

export default Messages
