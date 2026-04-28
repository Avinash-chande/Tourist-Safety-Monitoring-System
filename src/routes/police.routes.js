import express from "express";

import {
  getAllAlerts,
  createEFIR,
  getMissingTourists,
} from "../controllers/police.controller.js";

import {
  verifyJWT,
  isPolice,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/police/alerts:
 *   get:
 *     summary: Get all panic alerts
 *     tags: [Police]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Alerts fetched successfully
 */
router.get("/alerts", verifyJWT, isPolice, getAllAlerts);

/**
 * @swagger
 * /api/v1/police/create-efir:
 *   post:
 *     summary: Create E-FIR for tourist case
 *     tags: [Police]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               touristId:
 *                 type: string
 *               complaint:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: E-FIR created successfully
 */
router.post("/create-efir", verifyJWT, isPolice, createEFIR);

/**
 * @swagger
 * /api/v1/police/missing-tourists:
 *   get:
 *     summary: Get all missing tourists
 *     tags: [Police]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Missing tourists fetched successfully
 */
router.get("/missing-tourists", verifyJWT, isPolice, getMissingTourists);

export default router;