import { Request, Response, response } from "express";
import User from "../models/user";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

export const ping = async (req: Request, res: Response) => {
    try {
        return response.status(200);
    } catch (error) {
        return response.status(500).json({
            message: "Internal Server Error;"
        });
    }
}

export const start = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = new User();
        const existsUser = await user.collection.findOne({ username: username });
        if (existsUser) {
            const correctPassword = await bcrypt.compare(password, existsUser.password);
            if (correctPassword) {
                const token = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 24 * 60 * 60 * 1000
                });

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
            message: "Internal Server Error."
        });
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        let { username, password } = req.body;
        password = await bcrypt.hash(password, 10);

        const existsUser = await User.collection.findOne({ username: username });

        if (existsUser) {
            return res.status(409).json({
                message: "The username is already in use."
            });
        }

        await User.collection.insertOne({ username, password });

        return res.status(201).json({
            message: "Now you are registered!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error."
        });
    }
}
