import express from 'express';
import cors from 'cors';
import "dotenv/config"
import dbconnect from './db/dbconnect.js'
import { app, server } from './socketio/server.js';
import path from "path"

const PORT = process.env.PORT || 3000;

dbconnect();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


import userRoutes from "./routes/user.routes.js"
import messagesRoutes from "./routes/message.route.js"
import cookieParser from 'cookie-parser';

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messagesRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errors = err.errors || [];

  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
});

// deployment
if (process.env.NODE_ENV === "production") {
  const dir_path = path.resolve();
  app.use(express.static("Client/dist"));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(dir_path, "../Client/dist", "index.html"));
  })
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})