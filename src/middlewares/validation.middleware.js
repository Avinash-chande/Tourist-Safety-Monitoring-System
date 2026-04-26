// middlewares/validation.middleware.js
export const validateRegister = (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
  } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  next();
};