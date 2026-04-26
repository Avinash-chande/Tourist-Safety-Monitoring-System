// routes/police.routes.js

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

router.get("/alerts", verifyJWT, isPolice, getAllAlerts);
router.post("/create-efir", verifyJWT, isPolice, createEFIR);
router.get("/missing-tourists", verifyJWT, isPolice, getMissingTourists);

export default router;