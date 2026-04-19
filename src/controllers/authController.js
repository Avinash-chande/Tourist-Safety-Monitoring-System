import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//  TOKEN GENERATOR 

export const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("User not found")
        }

        const accessToken = user.generateAccessToken()

        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        // 🔥 MUST return both
        return { accessToken, refreshToken }

    } catch (error) {
        console.error("TOKEN GENERATION ERROR:", error)
        throw new Error("Failed to generate tokens")
    }
}

//  REGISTER
export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }


    const user = await User.create({
        name,
        email,
        password,
        role: role || "tourist"
    });

    return res.status(201).json(
        new ApiResponse(201, {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }, "User registered successfully")
    );
});

//  LOGIN 
export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const cleanPassword = password.trim(); // 🔥 remove spaces


    const isMatch = await bcrypt.compare(cleanPassword, user.password);


    // console.log("Entered:", cleanPassword);
    // console.log("Stored:", user.password);

    // console.log("Match:", isMatch);



    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }




    // ✅ FIX: use await + correct param
    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);

    return res.status(200).json(
        new ApiResponse(200, {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken,
            refreshToken
        }, "Login successful")
    );
});

//  LOGOUT 
export const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 }
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Logged out successfully")
    );
});