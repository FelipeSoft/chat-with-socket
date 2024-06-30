"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRequest = void 0;
const socket_io_1 = require("socket.io");
class JoinRequest extends socket_io_1.Socket {
    username;
}
exports.JoinRequest = JoinRequest;
