import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Alert from "../models/alert.model.js";

export const getDashboardStats = asyncHandler(async (req, res) => {

    const totalTourists = await User.countDocuments({ role: "tourist" });

    const activeAlerts = await Alert.countDocuments({ status: "active" });

    const offlineUsers = await User.countDocuments({ status: "offline" });

    return res.status(200).json(
        new ApiResponse(200, {
            totalTourists,
            activeAlerts,
            offlineUsers
        }, "Dashboard stats fetched")
    );
});