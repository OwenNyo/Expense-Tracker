const multer = require('multer'); // Import multer for handling file uploads

// === Storage Configuration ===
// This tells multer where to store the uploaded files and how to name them
const storage = multer.diskStorage({
    // Folder to save uploaded files
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // All files will be saved in the 'uploads' directory
    },
    // Define custom filename
    filename: (req, file, cb) => {
        // Use current timestamp + original file name to avoid name conflicts
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// === File Type Filter ===
// This ensures only specific image types are accepted
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        // Reject file and throw error if mimetype is not allowed
        cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
    }
};

// Create the multer instance with custom storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload; // Export this middleware so it can be used in routes
