const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");

const router = express.Router();

// Add new Expense
router.post("/add", protect, addExpense);

// Get all Expenses
router.get("/get", protect, getAllExpense);

// Download Expenses
router.get("/downloadexcel", protect, downloadExpenseExcel);

// Delete Expense
router.delete("/:id", protect, deleteExpense);

module.exports = router;