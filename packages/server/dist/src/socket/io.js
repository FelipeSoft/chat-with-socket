"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const formatTime_1 = require("../utils/formatTime");
const index_1 = require("../../index");
let connectedUsers = [];
let messages = [];
const io = new socket_io_1.Server(index_1.server, {
    cors: {
        origin: ["http://localhost:3000", "http://192.168.200.154:3000"]
    }
});
io.on("connection", (socket) => {
    socket.on("join-request", (username) => {
        socket.username = username;
        connectedUsers.push({ username });
        messages.push({
            status: "joined",
            user: username,
            time: (0, formatTime_1.formatTime)(new Date())
        });
        io.emit("log-update", {
            connectedUsers: connectedUsers.map(user => user.username),
            messages: messages
        });
    });
    socket.on("log-update", () => {
        io.emit("log-update", {
            connectedUsers: connectedUsers.map(user => user.username),
            messages: messages
        });
    });
    socket.on("message", (message) => {
        messages.push({
            message: message,
            user: socket.username,
            time: (0, formatTime_1.formatTime)(new Date())
        });
        io.emit("log-update", {
            connectedUsers: connectedUsers.map(user => user.username),
            messages: messages
        });
    });
    socket.on("disconnect", () => {
        connectedUsers = connectedUsers.filter(user => user.username !== socket.username);
        messages.push({
            status: "left",
            user: socket.username,
            time: (0, formatTime_1.formatTime)(new Date())
        });
        io.emit("log-update", {
            connectedUsers: connectedUsers.map(user => user.username),
            messages: messages
        });
    });
});
exports.default = io;
