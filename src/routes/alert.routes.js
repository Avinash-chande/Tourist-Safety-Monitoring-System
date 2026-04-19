import express from "express";
import {
    createAlert,
    getAllAlerts,
    resolveAlert
} from "../controllers/alertController.js";

import { verifyJWT, isAdmin, isTourist } from "../middlewares/auth.middleware.js";

const router = express.Router();


//  CREATE ALERT (Tourist triggers SOS / Geo / Offline)
router.post("/", verifyJWT, isTourist, createAlert);


//  GET ALL ALERTS (Admin Dashboard)
router.get("/", verifyJWT, isAdmin, getAllAlerts);


//  RESOLVE ALERT (Admin action)
router.patch("/:id", verifyJWT, isAdmin, resolveAlert);


export default router;