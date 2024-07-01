"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.start = exports.ping = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ping = async (req, response) => {
    try {
        const user = jsonwebtoken_1.default.verify(req.cookies.token, process.env.JWT_SECRET);
        return response.status(200).json({ pong: "test" });
    }
    catch (error) {
        return response.status(400).json({
            message: "Bad Request"
        });
    }
};
exports.ping = ping;
const start = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new user_1.default();
        const existsUser = await user.collection.findOne({ username: username });
        if (existsUser) {
            const correctPassword = await bcrypt_1.default.compare(password, existsUser.password);
            if (correctPassword) {
                const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error."
        });
    }
};
exports.start = start;
const create = async (req, res) => {
    try {
        let { username, password } = req.body;
        password = await bcrypt_1.default.hash(password, 10);
        const user = new user_1.default();
        const existsUser = await user.collection.findOne({ username: username });
        if (existsUser) {
            return res.status(409).json({
                message: "The username is already in use."
            });
        }
        user.username = username;
        user.password = password;
        await user.save();
        return res.status(200).json({
            message: "Now you are registered!"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error."
        });
    }
};
exports.create = create;
