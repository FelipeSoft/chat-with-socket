"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserSchema = void 0;
const zod_1 = require("zod");
exports.AuthUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(2, {
        message: "Username must contain at least 2 characters"
    }).max(50, {
        message: "String must contain at most 50 characters"
    }),
    password: zod_1.z.string().min(2, {
        message: "Password must contain at least 2 characters"
    }).max(255, {
        message: "String must contain at most 255 characters"
    })
});
