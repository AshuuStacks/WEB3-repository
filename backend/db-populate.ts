import { readFileSync } from "node:fs";
import { db } from "./src/prisma/db.ts";

async function main() {
  const data = readFileSync("data/expenses.init.json", "utf-8");
  const expenses = JSON.parse(data);

  for (const expense of expenses) {
    await db.orm.public.Expense.create({
      date: expense.date,
      description: expense.description,
      payer: expense.payer,
      amount: expense.amount,
    });
  }

  console.log("Dépenses importées !");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
