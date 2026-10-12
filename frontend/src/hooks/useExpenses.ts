import { useState, useEffect, useCallback } from "react";
import type { Expense } from "../types";

const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExpenses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/expenses");

            if (!response.ok) {
                throw new Error("Failed to fetch expenses");
            }

            const data: Expense[] = await response.json();
            setExpenses(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const addExpense = async (expense: Expense) => {
        const response = await fetch("/api/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        });

        if (!response.ok) {
            throw new Error("Failed to add expense");
        }

        await fetchExpenses();
    };

    const resetExpenses = async () => {
        const response = await fetch("/api/expenses/reset", {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("Failed to reset expenses");
        }

        await fetchExpenses();
    };

    return {
        expenses,
        loading,
        error,
        addExpense,
        resetExpenses
    };
};

export default useExpenses;
