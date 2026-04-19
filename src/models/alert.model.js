import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({

  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: ["SOS", "GEOFENCE", "OFFLINE"],
    required: true
  },

  message: {
    type: String
  },

  location: {
    lat: Number,
    lng: Number
  },

  status: {
    type: String,
    enum: ["active", "resolved"],
    default: "active"
  }

}, { timestamps: true });

export default mongoose.model("Alert", alertSchema);