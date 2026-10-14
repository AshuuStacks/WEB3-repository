
import { db } from "./src/prisma/db.ts";
async function main() {
  // 1. Créer les utilisateurs
  const ashu = await db.orm.public.User.create({
    name: "Ashu",
    email: "ashu@example.com",
  });

  const alex = await db.orm.public.User.create({
    name: "Alex",
    email: "alex@example.com",
    bankAccount: null,
  });

  // 2. Créer les dépenses
  const expense1 = await db.orm.public.Expense.create({
    date: new Date().toISOString(),
    description: "Courses",
    amount: 45,
    payerId: ashu.id,
  });

  await db.orm.public.Expense.create({
    date: new Date().toISOString(),
    description: "Restaurant",
    amount: 30,
    payerId: alex.id,
  });

  // 3. Créer un transfert entre les utilisateurs
  await db.orm.public.Transfer.create({
    amount: 15,
    sourceId: ashu.id,
    targetId: alex.id,
  });

  console.log("Utilisateurs, dépenses et transfert créés !");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
