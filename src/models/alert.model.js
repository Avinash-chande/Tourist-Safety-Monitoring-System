// models/Alert.js
import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    alertType: {
      type: String,
      enum: ["SOS", "GeoFence", "Missing", "Inactivity"],
      required: true,
    },

    location: {
      latitude: Number,
      longitude: Number,
      address: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },

    assignedOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Alert", alertSchema);