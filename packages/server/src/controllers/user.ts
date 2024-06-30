import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const start = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = new User();
        const existsUser = await user.collection.findOne({ username: username });

        if (existsUser) {
            const correctPassword = await bcrypt.compare(password, existsUser.password);
            if (correctPassword) {
                const token = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
                res.cookie("token", token);
                return res.status(200).json({
                    message: "Connected successfully!"
                });
            }
            return res.status(400).json({
                message: "Incorrect credentials!"
            });
        }

        return res.status(400).json({
            message: "You don't have access to the platform. Please, create an account and come back here."
        });
    } catch (error) {
        return res.status(500).json({
            error: "Interval Server Error."
        });
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        let { username, password } = req.body;
        password = await bcrypt.hash(password, 10);

        const user = new User();
        const existsUser = await user.collection.findOne({ username: username });

        if (existsUser) {
            return res.status(409).json({
                message: "The username already in use."
            });
        }

        user.username = username;
        user.password = password;
        user.save();

        return res.status(200).json({
            message: "Now you are registered!"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Interval Server Error."
        });
    }
}