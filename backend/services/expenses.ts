import { db } from "../src/prisma/db.ts";

export async function getAllExpenses() {
  return await db.orm.public.Expense.all();
}

export async function addExpense(expense: {
  date: string;
  description: string;
  payer: string;
  amount: number;
}) {
  return await db.orm.public.Expense.create({
    date: expense.date,
    description: expense.description,
    payer: expense.payer,
    amount: expense.amount,
  });
}
