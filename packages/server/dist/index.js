"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
exports.server = http_1.default.createServer(app);
require("./src/socket/SocketIoServer");
exports.server.listen(8080, () => {
    console.log("Server listening on port 8080 ✅");
});
