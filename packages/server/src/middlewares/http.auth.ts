import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkHttpUserAuthentication = (request: Request, response: Response, next: NextFunction) => {
    try {
        if (request.cookies) {
            const token = request.cookies.token;
            const isValidToken = jwt.verify(token, process.env.JWT_SECRET as string);
            
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
    } catch (error) {
        return response.status(401).json({
            message: error
        });
    }
}