import React, { use, useEffect } from 'react'
import useConversation from '../statemanagement/useConversation';
import axios from 'axios';

function useGetMessage() {
    const [loading, setLoading] = React.useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/messages/getMessage/${selectedConversation?._id}`, { withCredentials: true });
                setMessages(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log("Error while getting messages ::", error|| "Internal error");

            }
        }

        getMessages();
    }, [selectedConversation,setMessages]);

    return ({ messages, loading })
}

export default useGetMessage
