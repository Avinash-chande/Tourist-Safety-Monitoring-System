// routes/admin.routes.js

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
    verifyJWT,
    isAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/all-tourists", verifyJWT, isAdmin, getAllTourists);
router.put("/verify-tourist/:id", verifyJWT, isAdmin, verifyTourist);
router.post("/create-geofence", verifyJWT, isAdmin, createGeoFence);
router.get("/geofence-list", verifyJWT, isAdmin, getAllGeoFences);
router.put("/update-geofence/:id", verifyJWT, isAdmin, updateGeoFence);
router.delete("/delete-geofence/:id", verifyJWT, isAdmin, deleteGeoFence);
router.get("/heatmap", verifyJWT, isAdmin, getHeatmapData);

export default router;