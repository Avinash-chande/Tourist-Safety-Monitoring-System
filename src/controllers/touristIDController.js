// controllers/tourist.controller.js

import TouristID from "../models/TouristID.js";
import Alert from "../models/Alert.js";
import User from "../models/user.model.js";


// Upload KYC
export const uploadKYC = async (req, res) => {
  try {
    const { aadhaarNumber, passportNumber } = req.body;

    const touristId = await TouristID.create({
      user: req.user._id,
      aadhaarNumber,
      passportNumber,
      validity: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ),
    });

    res.status(201).json({
      success: true,
      message: "KYC uploaded successfully",
      touristId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Generate Tourist ID
export const generateTouristID = async (req, res) => {
  try {
    const tourist = await TouristID.findOne({
      user: req.user._id,
    });

    if (!tourist) {
      return res.status(404).json({
        message: "Please upload KYC first",
      });
    }

    tourist.blockchainHash =
      "TEMP_HASH_" + Date.now();

    await tourist.save();

    res.status(200).json({
      success: true,
      message: "Tourist ID generated successfully",
      tourist,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Add Itinerary
export const addItinerary = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      hotelName,
    } = req.body;

    const tourist = await TouristID.findOne({
      user: req.user._id,
    });

    if (!tourist) {
      return res.status(404).json({
        message: "Tourist profile not found",
      });
    }

    tourist.tripDetails = {
      destination,
      startDate,
      endDate,
      hotelName,
    };

    await tourist.save();

    res.status(200).json({
      success: true,
      message: "Itinerary added successfully",
      tourist,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Panic Button
export const panicAlert = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      address,
    } = req.body;

    const alert = await Alert.create({
      tourist: req.user._id,
      alertType: "SOS",
      location: {
        latitude,
        longitude,
        address,
      },
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Emergency alert sent successfully",
      alert,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Live Location
export const shareLiveLocation = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      address,
    } = req.body;

    res.status(200).json({
      success: true,
      message: "Live location shared successfully",
      location: {
        latitude,
        longitude,
        address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Notifications
export const getNotifications = async (req, res) => {
  try {
    const alerts = await Alert.find({
      tourist: req.user._id,
    }).sort({ createdAt: -1 });

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