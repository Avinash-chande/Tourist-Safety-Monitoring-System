import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import xss from "xss-clean";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import rateLimiter from "./middlewares/rateLimit.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();


// Security Middlewares

app.use(helmet()); // Security headers

app.use(compression()); // Faster responses

app.use(hpp()); // Prevent parameter pollution attacks

app.use(xss()); // Prevent XSS attacks 

app.use(morgan("dev")); // Logging HTTP requests

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


// Swagger Documentation Route

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


// Test Route

app.get("/", (req, res) => {
  res.send("Tourist Safety Monitoring API Running");
});


// Import Routes
import authRouter from "./routes/auth.routes.js";
import touristRouter from "./routes/tourist.routes.js";
import adminRouter from "./routes/admin.routes.js";
import policeRouter from "./routes/police.routes.js";


// Declare Routes
app.use("/api/v1/users", authRouter);
app.use("/api/v1/tourist", touristRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/police", policeRouter);


// Global Error Handler
// ALWAYS LAST

app.use(errorHandler);

export default app;