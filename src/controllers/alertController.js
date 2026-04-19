import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Alert from "../models/alert.model.js";
import User from "../models/user.model.js";


// ✅ CREATE ALERT (SOS / GEOFENCE / OFFLINE)
export const createAlert = asyncHandler(async (req, res) => {

    const { userId, type, message, lat, lng } = req.body;

    if (!userId || !type) {
        throw new ApiError(400, "Required fields missing");
    }

    const alert = await Alert.create({
        tourist: userId,
        type,
        message,
        location: { lat, lng }
    });

    // update user status
    let status = "risk";

    if (type === "OFFLINE") status = "offline";

    await User.findByIdAndUpdate(userId, { status });

    return res.status(201).json(
        new ApiResponse(201, alert, "Alert created")
    );
});


// ✅ GET ALL ALERTS (FOR DASHBOARD)
export const getAllAlerts = asyncHandler(async (req, res) => {

    const alerts = await Alert.find()
        .populate("tourist", "name touristId")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, alerts, "Alerts fetched")
    );
});


// ✅ RESOLVE ALERT
export const resolveAlert = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const alert = await Alert.findByIdAndUpdate(
        id,
        { status: "resolved" },
        { new: true }
    );

    if (!alert) {
        throw new ApiError(404, "Alert not found");
    }

    return res.status(200).json(
        new ApiResponse(200, alert, "Alert resolved")
    );
});