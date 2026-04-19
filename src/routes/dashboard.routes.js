import express from "express";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { getAllTourists } from "../controllers/touristController.js";

const router = express.Router();

router.get("/", verifyJWT, isAdmin, getDashboardStats);
router.get("/tourists", verifyJWT, isAdmin, getAllTourists);

export default router;