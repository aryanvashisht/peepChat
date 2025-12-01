import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authcontext";
import { io } from "socket.io-client";

export const socketcontext = createContext();

export const useSocketContext = () => useContext(socketcontext);
// to reuse the context in other components

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log("socketcontext", user?.user?._id);
        console.log("socketcontext", user);
        const userId = user?.user?._id || user?.data?._id;

        if (!userId) return;

        if (user) {
            const socket = io(`${"http://localhost:5005/"}`, {
                query: { userId },
                // reconnection: false,
            });
            setSocket(socket);
            socket.on("connect", () => console.log("Connected"));
            socket.on("disconnect", (reason) => console.log("Disconnected:", reason));
            socket.on("connect_error", (err) => console.log("Connect error:", err));

            socket.on("getOnlineUsers", (users) => {
                console.log("Online users:", users);
                setOnlineUsers(users);
            });
            return () => {
                console.log(onlineUsers, "cleanup socket");
                socket.disconnect();
            }
        }
    }, [user]);
    return (
        <socketcontext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketcontext.Provider>
    )
};