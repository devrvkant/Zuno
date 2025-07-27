import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../services/cloudinary/cloudinary.config.js";

// Existing profile picture storage
const profilePicStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pictures",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

// New message image storage
const messageImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "message_images",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
    transformation: [
      { width: 400, height: 300, crop: "limit" }, // Resize large images
      { quality: "auto:good" }, // Auto optimize quality
      { fetch_format: "auto" }, // Convert to webp if supported
      { flags: "progressive" }, // Progressive loading for JPEGs
    ],
  },
});

// Conditional middleware for message image upload
const uploadMessageImage = multer({ storage: messageImageStorage });
export const uploadMessageImageOptional = (req, res, next) => {
  const contentType = req.get("Content-Type");

  // Only user multer if message have an image
  if (contentType && contentType.includes("multipart/form-data")) {
    uploadMessageImage.single("image")(req, res, next);
  } else {
    next();
  }
};

export const uploadProfilePic = multer({ storage: profilePicStorage });
