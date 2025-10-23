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

    const filename = req.file.filename;                // e.g. "171...-cat1.jpg"
    const relativePath = `${process.env.CLIENT_URL}/uploads/${filename}`;       // store/render this
    console.log("Uploaded file URL:", relativePath);

    // Construct URL to access uploaded image
    res.status(200).json({ relativePath });
});

module.exports = router;
