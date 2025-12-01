import { useEffect } from 'react';
import { useSocketContext } from './socketcontext';
import useConversation from '../statemanagement/useConversation';

function useGetSocketMessage() {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;
        console.log("newMessage");
        
        const handleNewMessage = ({newMessage,conversationId}) => {
            const notification = new Audio('/gta_online_sms.mp3');
            notification.play();
            console.log(conversationId);
            console.log("newMessage",newMessage);
            setMessages([...messages, newMessage]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => socket.off("newMessage", handleNewMessage);

    }, [socket, setMessages]);
}

export default useGetSocketMessage;
