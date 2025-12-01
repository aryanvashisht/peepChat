import React from 'react'
import useCoversation from '../../statemanagement/useConversation';
import { useSocketContext } from '../../context/socketcontext';


function User({ user }) {
    const { selectedConversation, setSelectedConversation } = useCoversation();
    const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers?.includes(user._id);

    return (
        <div className={`hover:bg-gray-800 cursor-pointer duration-300 ${isSelected ? 'bg-gray-700' : ''}`}
            onClick={() => setSelectedConversation(user)}>
            <div className='flex pl-8 p-3 space-x-6 hover:bg-gray-800 cursor-pointer duration-300'>
                <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
                    <div className="w-15 rounded-full">
                        <img src={user?.displayimage || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"} />
                    </div>
                </div>
                <div className='content-center'>
                    <h1>{user.name}</h1>
                    <span>{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default User
