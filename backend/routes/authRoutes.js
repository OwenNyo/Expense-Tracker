const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

// Get current user info (requires authentication)
router.get("/getUser", protect, getUserInfo);

// Handle image upload (expects 'image' field in form-data)
router.post("/upload-image", upload.single("image"), (req, res) => { 
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Construct URL to access uploaded image
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;
