// app.js
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import xss from "xss-clean";
import morgan from "morgan";

import rateLimiter from "./middlewares/rateLimit.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();



// Security Middlewares

app.use(helmet()); // Security headers

app.use(compression()); // Faster response

app.use(hpp()); // Prevent parameter pollution

app.use(xss()); // Prevent XSS attacks

app.use(morgan("dev")); // Logging

app.use(rateLimiter); // Rate limit protection


// Core Middlewares

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());


// Test Route

app.get("/", (req, res) => {
  res.send("Tourist Safety Monitoring API Running");
});


// Import Routes

import userRouter from "./routes/user.routes.js";
import touristRouter from "./routes/tourist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import alertRouter from "./routes/alert.routes.js";


// Declare Routes

app.use("/api/v1/users", userRouter);

app.use("/api/v1/tourists", touristRouter);

app.use("/api/v1/dashboard", dashboardRouter);

app.use("/api/v1/alerts", alertRouter);


// Global Error Handler
// ALWAYS LAST

app.use(errorHandler);

export default app;