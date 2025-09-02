const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");

const router = express.Router();

// Add new Income
router.post("/add", protect, addIncome);
    
// Get all Income
router.get("/get", protect, getAllIncome);

// Download Income
router.get("/downloadexcel", protect, downloadIncomeExcel);

// Delete Income
router.delete("/:id", protect, deleteIncome);

module.exports = router;