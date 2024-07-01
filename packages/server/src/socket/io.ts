import { Server, Socket } from "socket.io";
import { formatTime } from "../utils/formatTime";
import { checkSocketUserAuthentication } from "../middlewares/socket.auth";
import { server } from "../../index";

interface User {
    username: string;
}

let connectedUsers: User[] = [];
let messages: any[] = [];

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket: any) => {
    socket.on("join-request", (username: string) => {
        socket.username = username;

        connectedUsers.push({ username });

        messages.push({
            status: "joined",
            user: username,
            time: formatTime(new Date())
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

    socket.on("message", (message: string) => {
        messages.push({
            message: message,
            user: socket.username,
            time: formatTime(new Date())
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
            time: formatTime(new Date())
        });

        io.emit("log-update", {
            connectedUsers: connectedUsers.map(user => user.username),
            messages: messages
        });
    });
});

export default io;
