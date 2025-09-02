const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { isValidObjectId, Types } = require("mongoose");

// Fetch all dashboard-related data for the logged-in user
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId)); // Convert string ID to ObjectId for aggregation

        // Aggregate total income for the user
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

        // Aggregate total expenses for the user
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // Fetch income transactions from the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Calculate total income for the last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch expense transactions from the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({ // This line is likely incorrect
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Calculate total expenses for the last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Combine latest 5 income and 5 expense transactions, then sort by date
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a, b) => b.date - a.date);

        // Final response combining all financial data
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
