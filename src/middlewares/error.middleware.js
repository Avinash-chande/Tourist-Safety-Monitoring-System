// middlewares/error.middleware.js
const errorHandler = (err, req, res, next) => {
  console.log("ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err.stack,
  });
};

export default errorHandler;