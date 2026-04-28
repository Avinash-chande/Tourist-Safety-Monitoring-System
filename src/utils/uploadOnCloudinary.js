import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto",
        folder: "tourist-kyc",
      }
    );

    // Delete local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    console.log(
      "Cloudinary Upload Error:",
      error.message
    );

    // Delete local file if upload fails
    if (
      localFilePath &&
      fs.existsSync(localFilePath)
    ) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;