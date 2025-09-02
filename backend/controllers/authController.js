const User = require('../models/User');
const jwt = require("jsonwebtoken");

// Generate JWT token with 1-hour expiration
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validate required fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use." });
        }

        // Create a new user (password hashing handled in the User model)
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        // Return user details and token
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user.", error: err.message });
    }
};

// Login an existing user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Validate credentials
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Return user details and token
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in.", error: err.message });
    }
};

// Get information for the logged-in user
exports.getUserInfo = async (req, res) => {
    try {
        // Retrieve user from database using ID set in middleware, excluding password
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Return user information
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error getting user info.", error: err.message });
    }
};
