
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Expense } from "../types";

type ExpenseItemProps = {
  addExpense: (expense: Expense) => void;
};

const expenseSchema = z.object({
  payer: z.enum(["Alice", "Bob"], {
    error: "Le payeur doit être Alice ou Bob.",
  }),
  date: z.string().min(1, "La date est obligatoire."),
  description: z
    .string()
    .max(200, "La description ne peut pas dépasser 200 caractères."),
  amount: z
    .number({ error: "Le montant doit être un nombre." })
    .positive("Le montant doit être positif."),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const ExpenseAdd = (props: ExpenseItemProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      payer: "Alice",
      date: new Date().toISOString().slice(0, 10),
      description: "",
    },
  });

  const onSubmit = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: new Date(data.date).toISOString(),
      description: data.description,
      payer: data.payer,
      amount: data.amount,
    };

    props.addExpense(newExpense);

    reset({
      payer: "Alice",
      date: new Date().toISOString().slice(0, 10),
      description: "",
      amount: undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Payeur :
        <select {...register("payer")}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      {errors.payer && <p>{errors.payer.message}</p>}

      <label>
        Date :
        <input type="date" {...register("date")} />
      </label>
      {errors.date && <p>{errors.date.message}</p>}

      <label>
        Description :
        <input type="text" {...register("description")} />
      </label>
      {errors.description && <p>{errors.description.message}</p>}

      <label>
        Montant :
        <input
          type="number"
          step="any"
          {...register("amount", { valueAsNumber: true })}
        />
      </label>
      {errors.amount && <p>{errors.amount.message}</p>}

      <button type="submit">Add expense</button>
    </form>
  );
};

export default ExpenseAdd;