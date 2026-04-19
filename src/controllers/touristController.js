import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";


// ✅ GET ALL TOURISTS (FOR TABLE)
export const getAllTourists = asyncHandler(async (req, res) => {

    const tourists = await User.find({ role: "tourist" })
        .select("-password")
        .sort({ createdAt: -1 });

    // console.log("SECRET:", process.env.ACCESS_TOKEN_SECRET);

    return res.status(200).json(
        new ApiResponse(200, tourists, "Tourists fetched successfully")
    );
});


// ✅ UPDATE LOCATION (REAL-TIME TRACKING)
export const updateLocation = asyncHandler(async (req, res) => {

    const { userId, lat, lng } = req.body;

    if (!userId || !lat || !lng) {
        throw new ApiError(400, "Location data missing");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            location: { lat, lng },
            lastUpdated: new Date(),
            status: "safe"
        },
        { new: true }
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "Location updated")
    );
});


// ✅ GET SINGLE TOURIST DETAILS
export const getTouristById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
        throw new ApiError(404, "Tourist not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "Tourist fetched")
    );
});