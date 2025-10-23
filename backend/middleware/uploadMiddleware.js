const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// === Cloudinary Config ===
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// === Storage Configuration ===
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "expense-tracker-uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, crop: "limit" }], // optional resize
  },
});

// === Multer Instance ===
const upload = multer({ storage });

module.exports = upload;
