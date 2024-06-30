import { z } from "zod";

export const AuthUserSchema = z.object({
    username: z.string().min(2, {
        message: "Username must contain at least 2 characters"
    }).max(50, {
        message: "String must contain at most 50 characters"
    }),
    password: z.string().min(2, {
        message: "Password must contain at least 2 characters"
    }).max(255, {
        message: "String must contain at most 255 characters"
    })
})