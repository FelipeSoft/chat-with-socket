import express, { json, urlencoded } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import http from "http";
import userRoutes from "./src/routes/user";
import cookieParser from "cookie-parser";
import "./config/mongoose";

dotenv.config();

const app = express();
export const server = http.createServer(app);

const corsOptions: CorsOptions = {
    origin: ["http://localhost:3000", "http://192.168.0.16"],
    methods: '*', 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(userRoutes);

server.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT + " ✅");
});

import "./src/socket/io";