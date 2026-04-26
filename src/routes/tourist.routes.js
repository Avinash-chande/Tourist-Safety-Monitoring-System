
import express from "express";

import {
    uploadKYC,
    generateTouristID,
    addItinerary,
    panicAlert,
    shareLiveLocation,
    getNotifications,
} from "../controllers/touristIDController.js";

import {
    verifyJWT,
    isTourist,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/upload-kyc", verifyJWT, isTourist, uploadKYC);
router.post("/generate-id", verifyJWT, isTourist, generateTouristID);
router.post("/add-itinerary", verifyJWT, isTourist, addItinerary);
router.post("/panic-alert", verifyJWT, isTourist, panicAlert);
router.post("/live-location", verifyJWT, isTourist, shareLiveLocation);
router.get("/notifications", verifyJWT, isTourist, getNotifications);
export default router;