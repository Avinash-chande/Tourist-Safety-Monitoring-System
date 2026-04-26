// controllers/admin.controller.js
import User from "../models/user.model.js";
import TouristID from "../models/touristID.model.js";
import GeoFence from "../models/geoFence.model.js";
import Alert from "../models/alert.model.js";


// View All Tourists
export const getAllTourists = async (req, res) => {
  try {
    const tourists = await User.find({
      role: "tourist",
    }).select("-password -refreshToken");

    res.status(200).json({
      success: true,
      count: tourists.length,
      tourists,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Verify Tourist
export const verifyTourist = async (req, res) => {
  try {
    const { id } = req.params;

    const tourist = await TouristID.findById(id);

    if (!tourist) {
      return res.status(404).json({
        message: "Tourist ID not found",
      });
    }

    tourist.isVerified = true;

    await tourist.save();

    res.status(200).json({
      success: true,
      message: "Tourist verified successfully",
      tourist,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Create GeoFence
export const createGeoFence = async (req, res) => {
  try {
    const geoFence = await GeoFence.create(req.body);

    res.status(201).json({
      success: true,
      message: "GeoFence created successfully",
      geoFence,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All GeoFences
export const getAllGeoFences = async (req, res) => {
  try {
    const geoFences = await GeoFence.find();

    res.status(200).json({
      success: true,
      count: geoFences.length,
      geoFences,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update GeoFence
export const updateGeoFence = async (req, res) => {
  try {
    const { id } = req.params;

    const geoFence = await GeoFence.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!geoFence) {
      return res.status(404).json({
        message: "GeoFence not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "GeoFence updated successfully",
      geoFence,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete GeoFence
export const deleteGeoFence = async (req, res) => {
  try {
    const { id } = req.params;

    const geoFence = await GeoFence.findByIdAndDelete(id);

    if (!geoFence) {
      return res.status(404).json({
        message: "GeoFence not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "GeoFence deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Heatmap Data
export const getHeatmapData = async (req, res) => {
  try {
    const alerts = await Alert.find({
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};