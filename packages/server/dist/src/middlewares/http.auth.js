"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHttpUserAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkHttpUserAuthentication = (request, response, next) => {
    try {
        if (request.cookies) {
            const token = request.cookies.token;
            const isValidToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (isValidToken) {
                return response.status(200).json({
                    message: "ok",
                    user: isValidToken
                });
            }
            return response.status(401).json({
                message: "not authorized"
            });
        }
        return response.status(401).json({
            message: "please provide a token"
        });
    }
    catch (error) {
        return response.status(401).json({
            message: error
        });
    }
};
exports.checkHttpUserAuthentication = checkHttpUserAuthentication;
