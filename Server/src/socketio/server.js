import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

// for real time message delivery
export const getReciverSocketId = (userId) => {
    return users[userId];
}

const users = {};

// listens server side events   
io.on("connection", (socket) => {
    console.log("New client connected!", socket.id);
console.log(socket.handshake.query.userId,"user id form query socket");

    const userId = socket.handshake.query.userId;

    if (userId) {
        users[userId] = socket.id;
        console.log("User connected with ID:", userId);
        console.log(users);
    }

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    })
})

export { io, server, app };