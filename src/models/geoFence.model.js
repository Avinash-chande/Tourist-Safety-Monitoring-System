// models/GeoFence.js
import mongoose from "mongoose";

const geoFenceSchema = new mongoose.Schema(
  {
    zoneName: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    radius: {
      type: Number,
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("GeoFence", geoFenceSchema);