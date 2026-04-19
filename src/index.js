import dotenv from "dotenv"
import connectDB from "./db/index.js";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {

    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
    });

    server.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });

})
.catch((err) => {
    console.log("db connection error !!", err);
})