// models/TouristID.js
import mongoose from "mongoose";

const touristIDSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    passportNumber: {
      type: String,
    },

    aadhaarNumber: {
      type: String,
    },

    tripDetails: {
      destination: String,
      startDate: Date,
      endDate: Date,
      hotelName: String,
    },

    emergencyContacts: [
      {
        name: String,
        relation: String,
        phone: String,
      },
    ],

    validity: {
      type: Date,
      required: true,
    },

    blockchainHash: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TouristID", touristIDSchema);