import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getProfile,
} from "../controllers/authController.js";

import {
  verifyJWT,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/profile", verifyJWT, getProfile);

export default router;