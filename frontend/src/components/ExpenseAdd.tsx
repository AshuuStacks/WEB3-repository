import type { Expense } from "../types";

type ExpenseItemProps = {
 addExpense : (expense: Expense) => void;   
}

const ExpenseAdd = (props : ExpenseItemProps) => {


const handleAddClick = () => {
    const id = Date.now().toString();
    const date = new Date().toISOString();
    const description = `New expense ${id}`;
    const payer = Math.random() < 0.5 ? "Alice" : "Bob";
    const amount = Math.round(Math.random() * 10000) / 100;

    const newExpense: Expense = {
        id,
        date,
        description,
        payer,
        amount
    };

    props.addExpense(newExpense);
};

    return (
<button onClick={handleAddClick}>Add</button>    );
};


export default ExpenseAdd;