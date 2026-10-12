
import { Router } from "express";
import { getAllExpenses, addExpense, resetExpenses } from "../services/expenses.ts";

const router = Router();

router.get("/expenses", (req, res) => {
    try {
        const expenses = getAllExpenses();
        res.json(expenses);
    } catch (error) {
        console.error("Error getting expenses:", error);
        res.status(500).json({
            error: "Failed to get expenses"
        });
    }
});

router.post("/expenses", (req, res) => {
    try {
        const expense = addExpense(req.body);
        res.json(expense);
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({
            error: "Failed to add expense"
        });
    }
});


router.post("/expenses/reset", (req, res) => {
    try {
        const expenses = resetExpenses();

        res.json({
            message: "Expenses reset successfully",
            expenses
        });
    } catch (error) {
        console.error("Error resetting expenses:", error);

        res.status(500).json({
            error: "Failed to reset expenses"
        });
    }
});

export default router;
