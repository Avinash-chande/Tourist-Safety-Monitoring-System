import express from "express";

import {
    getAllTourists,
    verifyTourist,
    createGeoFence,
    getAllGeoFences,
    updateGeoFence,
    deleteGeoFence,
    getHeatmapData,
} from "../controllers/adminController.js";

import {
    geoFenceValidation,
} from "../middlewares/validation.middleware.js";

import {
    verifyJWT,
    isAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/admin/all-tourists:
 *   get:
 *     summary: Get all tourists
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tourists fetched successfully
 */
router.get("/all-tourists", verifyJWT, isAdmin, getAllTourists);

/**
 * @swagger
 * /api/v1/admin/verify-tourist/{id}:
 *   put:
 *     summary: Verify tourist by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tourist verified successfully
 */
router.put("/verify-tourist/:id", verifyJWT, isAdmin, verifyTourist);

/**
 * @swagger
 * /api/v1/admin/create-geofence:
 *   post:
 *     summary: Create new geofence
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               areaName:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               radius:
 *                 type: number
 *     responses:
 *       201:
 *         description: GeoFence created successfully
 */
router.post(
    "/create-geofence",
    verifyJWT,
    isAdmin,
    geoFenceValidation,
    createGeoFence
);

/**
 * @swagger
 * /api/v1/admin/geofence-list:
 *   get:
 *     summary: Get all geofences
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: GeoFence list fetched successfully
 */
router.get("/geofence-list", verifyJWT, isAdmin, getAllGeoFences);

/**
 * @swagger
 * /api/v1/admin/update-geofence/{id}:
 *   put:
 *     summary: Update geofence by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: GeoFence updated successfully
 */
router.put("/update-geofence/:id", verifyJWT, isAdmin, updateGeoFence);

/**
 * @swagger
 * /api/v1/admin/delete-geofence/{id}:
 *   delete:
 *     summary: Delete geofence by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: GeoFence deleted successfully
 */
router.delete("/delete-geofence/:id", verifyJWT, isAdmin, deleteGeoFence);

/**
 * @swagger
 * /api/v1/admin/heatmap:
 *   get:
 *     summary: Get heatmap data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Heatmap data fetched successfully
 */
router.get("/heatmap", verifyJWT, isAdmin, getHeatmapData);

export default router;