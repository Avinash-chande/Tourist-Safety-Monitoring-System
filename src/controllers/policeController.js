// controllers/police.controller.js
import Alert from "../models/alert.model.js";
import TouristID from "../models/touristID.model.js";


// View Alerts
export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("tourist", "name email phone")
      .sort({ createdAt: -1 });

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


// E-FIR Generation
export const createEFIR = async (req, res) => {
  try {
    const {
      touristId,
      complaint,
      lastKnownLocation,
    } = req.body;

    const firNumber =
      "FIR-" + Date.now();

    res.status(201).json({
      success: true,
      message: "E-FIR generated successfully",
      data: {
        firNumber,
        touristId,
        complaint,
        lastKnownLocation,
        status: "Open",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Missing Tourist Tracking
export const getMissingTourists = async (req, res) => {
  try {
    const missingCases = await Alert.find({
      alertType: "Missing",
    }).populate(
      "tourist",
      "name email phone"
    );

    res.status(200).json({
      success: true,
      count: missingCases.length,
      missingCases,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};