import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["tourist", "admin", "police"],
      default: "tourist",
    },

    language: {
      type: String,
      default: "English",
    },

    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);




userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

//check entered password and db password is simliar or not
// use costum methods its give boolean value
userSchema.methods.ispasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     { _id: this._id },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//   )
// }
// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     { _id: this._id },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//   )
// }
export default mongoose.model("User", userSchema);