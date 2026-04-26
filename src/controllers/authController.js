
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";


// Register
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      language,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      language,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        accessToken,
        refreshToken,
        user,
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Logout
export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      refreshToken: "",
    });

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({
        success: true,
        message: "Logout successful",
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Refresh Token
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded._id);

    if (
      !user ||
      user.refreshToken !== incomingRefreshToken
    ) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = generateAccessToken(user._id);

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json({
        success: true,
        accessToken: newAccessToken,
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Profile
export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};