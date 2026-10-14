import type  { Expense } from "../types";

type ExpenseItemProps = {
    expense: Expense;
}


const ExpenseItem = (expenseItemProps: ExpenseItemProps) => {
    
    
    return (<> <h1>{expenseItemProps.expense.date}</h1>
     <h1>{expenseItemProps.expense.description}</h1>
    <h1>$ {expenseItemProps.expense.amount.toFixed(2)}</h1>
     <h1>{expenseItemProps.expense.payerId}</h1>
    </>)
}


export default ExpenseItem;