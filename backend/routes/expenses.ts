import { Router } from "express";
import { getAllExpenses, addExpense } from "../services/expenses.ts";

const router = Router();

router.post("/expenses", async (req, res) => {
  try {
    console.log("POST body reçu :", req.body);

    const expense = await addExpense(req.body);
    res.json(expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({
      error: "Failed to add expense",
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
