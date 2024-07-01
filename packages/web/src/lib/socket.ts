import { io } from "socket.io-client";

const socket = io("http://192.168.200.154:3001");

export default socket;
