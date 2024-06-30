import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const mongoURI = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;

mongoose.connect(mongoURI).then(() => {
    console.log("Connected successfully with MongoDB");
}).catch((error) => {
    console.error("MongoDB Connection Error:", error);
});