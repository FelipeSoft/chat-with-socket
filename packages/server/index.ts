import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import http from "http";
import userRoutes from "./src/routes/user";
import "./config/mongoose";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(userRoutes);

server.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT + " ✅");
});