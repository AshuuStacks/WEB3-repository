import { db } from "../src/prisma/db";

export async function getAllExpenses() {
  return await db.orm.public.Expense.all();
}

export async function addExpense(expense: {
  date: string;
  description: string;
  payerId: number;
  amount: number;
}) {
  return await db.orm.public.Expense.create({
    date: expense.date,
    description: expense.description,
    payerId: expense.payerId,
    amount: expense.amount,
  });
}