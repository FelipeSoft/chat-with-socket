import { Server } from "socket.io";
import { formatTime } from "../utils/formatTime";

let connnectedUsers: any[] = [];
let messages: any[] = [];

const io = new Server(Number(process.env.PORT), {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket: any) => {
    socket.on("join-request", (username: any) => {
        socket.username = username;

        connnectedUsers.push(username);
        
        messages.push({
            status: "joined",
            user: username,
            time: formatTime(new Date())
        });

        io.emit("log-update", {
            connnectedUsers: connnectedUsers,
            messages: messages
        });
    });

    socket.on("message", (message: any) => {
        messages.push({
            message: message,
            user: socket.username,
            time: formatTime(new Date())
        });

        io.emit("log-update", {
            connnectedUsers: connnectedUsers,
            messages: messages
        });
    });

    socket.on("disconnect", () => {
        connnectedUsers = connnectedUsers.fill((u: any) => u != socket.username);

        messages.push({
            status: "joined",
            user: socket.username,
            time: formatTime(new Date())
        });

        io.emit("log-update", {
            connnectedUsers: connnectedUsers,
            messages: messages
        });
    });
});

export default io;