// index.js

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH"],
      },
    });


    // Socket.io Real-Time Panic Alerts

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      // Tourist sends SOS alert
      socket.on("panicAlert", (data) => {
        console.log("Emergency Alert:", data);

        io.emit("newPanicAlert", {
          message: "Emergency SOS Alert",
          tourist: data.tourist,
          location: data.location,
          time: new Date(),
        });
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });


    server.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 8000}`
      );
    });
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });