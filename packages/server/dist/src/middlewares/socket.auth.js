"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSocketUserAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkSocketUserAuthentication = (socket, next) => {
    const cookie = socket.handshake.headers.cookie;
    if (!cookie) {
        return next(new Error("cookie is required"));
    }
    const token = cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1];
    if (!token) {
        return next(new Error("token is required"));
    }
    jsonwebtoken_1.default.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error"));
        }
        socket.decoded = decoded;
        next();
    });
};
exports.checkSocketUserAuthentication = checkSocketUserAuthentication;
