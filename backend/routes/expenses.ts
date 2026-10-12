import { Router } from "express";
import { getAllExpenses, addExpense } from "../services/expenses.ts";

const router = Router();

router.get("/expenses", async (req, res) => {
  try {
    const expenses = await getAllExpenses();
    res.json(expenses);
  } catch (error) {
    console.error("Error getting expenses:", error);
    res.status(500).json({
      error: "Failed to get expenses",
    });
  }
});

router.post("/expenses", async (req, res) => {
  try {
    const expense = await addExpense(req.body);
    res.json(expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({
      error: "Failed to add expense",
    });
  }
});

export default router;
