
import fs from "fs";
import type { Expense } from "../types/expense.ts";
const expensesFilePath = "data/expenses.json";

export function getAllExpenses(): Expense[] {
    const data = fs.readFileSync(expensesFilePath, "utf-8");

    const expenses: Expense[] = JSON.parse(data);

    return expenses;
}


export function addExpense(expense: Expense): Expense {
    const expenses = getAllExpenses();

    expenses.push(expense);

    fs.writeFileSync(
        expensesFilePath,
        JSON.stringify(expenses, null, 2)
    );

    return expense;
}


export function resetExpenses(): Expense[] {
    const data = fs.readFileSync("data/expenses.init.json", "utf-8");

    const expenses: Expense[] = JSON.parse(data);

    fs.writeFileSync(
        expensesFilePath,
        JSON.stringify(expenses, null, 2)
    );

    return expenses;
}
