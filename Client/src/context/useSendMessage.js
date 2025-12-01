import React from 'react'
import useConversation from '../statemanagement/useConversation';
import axios from 'axios';

function useSendMessage() {
    const [loading, setLoading] = React.useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (newmessage) => {
        console.log(newmessage);
        
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/messages/sendMessage/${selectedConversation?._id}`,{message: newmessage}, { withCredentials: true });
            setMessages([...messages, response.data.data]);
            console.log(response.data.data,"response data data");
            
            setLoading(false);
        } catch (error) {
            console.log("Error while sending messages ::", error || "Internal error");

        }
    }

    return ({ loading, sendMessage })
}

export default useSendMessage
