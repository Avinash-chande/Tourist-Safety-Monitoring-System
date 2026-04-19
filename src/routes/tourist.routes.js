import express from "express";
import { verifyJWT, isTourist } from "../middlewares/auth.middleware.js";
import { getAllTourists, updateLocation, getTouristById } from "../controllers/touristController.js";

const router = express.Router();

router.post("/location", verifyJWT, isTourist, updateLocation);
router.get("/:id", verifyJWT, isTourist, getTouristById);

export default router;