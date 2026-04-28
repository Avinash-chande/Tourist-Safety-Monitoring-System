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
    uploadKYCValidation,
    panicAlertValidation,
} from "../middlewares/validation.middleware.js";

import {
    verifyJWT,
    isTourist,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/tourist/upload-kyc:
 *   post:
 *     summary: Upload tourist KYC document
 *     tags: [Tourist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: KYC uploaded successfully
 */
router.post(
    "/upload-kyc",
    verifyJWT,
    isTourist,
    upload.single("document"),
    uploadKYCValidation,
    uploadKYC
);

/**
 * @swagger
 * /api/v1/tourist/generate-id:
 *   post:
 *     summary: Generate Tourist ID
 *     tags: [Tourist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Tourist ID generated successfully
 */
router.post("/generate-id", verifyJWT, isTourist, generateTouristID);

/**
 * @swagger
 * /api/v1/tourist/add-itinerary:
 *   post:
 *     summary: Add tourist itinerary details
 *     tags: [Tourist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destination:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               hotelDetails:
 *                 type: string
 *     responses:
 *       201:
 *         description: Itinerary added successfully
 */
router.post("/add-itinerary", verifyJWT, isTourist, addItinerary);

/**
 * @swagger
 * /api/v1/tourist/panic-alert:
 *   post:
 *     summary: Send panic alert in emergency
 *     tags: [Tourist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               emergencyType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Panic alert sent successfully
 */
router.post(
    "/panic-alert",
    verifyJWT,
    isTourist,
    panicAlertValidation,
    panicAlert
);

/**
 * @swagger
 * /api/v1/tourist/live-location:
 *   post:
 *     summary: Share live location
 *     tags: [Tourist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Live location shared successfully
 */
router.post("/live-location", verifyJWT, isTourist, shareLiveLocation);

/**
 * @swagger
 * /api/v1/tourist/notifications:
 *   get:
 *     summary: Get tourist notifications
 *     tags: [Tourist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 */
router.get("/notifications", verifyJWT, isTourist, getNotifications);

export default router;