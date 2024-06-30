"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const index_1 = require("../../index");
const formatTime_1 = require("../utils/formatTime");
let connectedUsers = [];
let messages = [];
const io = new socket_io_1.Server(index_1.server);
io.on("connection", (socket) => {
    socket.on("test", (test) => {
        console.log(test);
    });
    socket.on("join-request", (username) => {
        socket.username = username;
        connectedUsers.push(username);
        messages.push({
            status: "joined",
            user: username,
            time: (0, formatTime_1.formatTime)(new Date())
        });
        socket.broadcast.emit("log-update", {
            messages: messages,
            connectedUsers: connectedUsers
        });
    });
    socket.on("message", (message) => {
        messages.push({
            message: message,
            user: socket.username,
            time: (0, formatTime_1.formatTime)(new Date())
        });
        socket.broadcast.emit("log-update", {
            messages: messages,
            connectedUsers: connectedUsers
        });
    });
    socket.on("disconnect", () => {
        connectedUsers = connectedUsers.filter(u => u !== socket.username);
        messages.push({
            status: "left",
            user: socket.username,
            time: (0, formatTime_1.formatTime)(new Date())
        });
        socket.broadcast.emit("log-update", {
            messages: messages,
            connectedUsers: connectedUsers
        });
    });
});
exports.default = io;
