import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

export const start = (req: Request, res: Response) => {
    try {
        let { username, password } = req.body;
        password = bcrypt.hash(password, 10);

        const user = new User({ username, password });
        user.save();
        
        return res.status(200).json({
            message: "Connected successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Interval Server Error"
        });
    }
}