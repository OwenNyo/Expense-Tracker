const User = require('../models/User'); // Import the User model from the database
const jwt = require("jsonwebtoken"); // Import JWT to verify the token

// Middleware to protect private routes
exports.protect = async (req, res, next) => {
    // Get the token from the "Authorization" header, if it exists
    // Header format: "Bearer <token>"
    let token = req.headers.authorization?.split(" ")[1];

    // If token is missing, block access
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token." });
    }

    try {
        // Verify token using the secret stored in .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user details from the database using the ID inside the token
        // Exclude the password field for security reasons
        req.user = await User.findById(decoded.id).select('-password'); 

        // Allow the request to continue to the next middleware or route handler
        next();
    } catch (err) {
        // Token is invalid or expired
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
