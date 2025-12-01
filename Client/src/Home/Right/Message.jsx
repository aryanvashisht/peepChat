import React, { useContext } from 'react'
import { AuthContext } from '../../context/authcontext';

function Message({ message }) {
  const { user } = useContext(AuthContext);

  const createdAt = new Date(message?.createdAt);
  const formattedDateTime = createdAt.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const isOwnMessage =
    (user?.user?._id || user?.data?._id) === message?.senderID;

  const chatSide = isOwnMessage ? "chat chat-end" : "chat chat-start";
  const chatColor = isOwnMessage
    ? "chat-bubble chat-bubble-info text-white bg-purple-500"
    : "chat-bubble";

  return (
    <div>
      <div className={chatSide}>
        <div className={chatColor}>{message.message}</div>
      </div>

      <span className={`text-xs opacity-70 ${chatSide}`}>
        {formattedDateTime}
      </span>
    </div>
  );
}

export default Message;
