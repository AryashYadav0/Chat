import { Server } from "Socket.io";
import http from "http";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,
    },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware)

const userSocketMap = {}

io.on("connection ", (socket) => {
    console.log("A user connection", socket.user.fullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    // io.emit() event send krta hai clients ko
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // listen for events from client 
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.user.fullName);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    });
});

export { io, app, server }