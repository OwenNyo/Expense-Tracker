// Load environment variables from .env file
require("dotenv").config();

// Import core modules and dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Create an Express app instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
// This allows the frontend (from a different origin) to access this backend
app.use(cors({
    origin: process.env.CLIENT_URL || "*", // Allow requests from frontend URL or any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to the database
connectDB();

// App Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Define the port the server should run on
const PORT = process.env.PORT || 5000;

// Serves upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server and listen for incoming requests
app.listen(PORT, () => 
    console.log(`Server is currently running on port ${PORT}`)
);
