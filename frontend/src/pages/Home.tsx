import ExpenseItem from "../components/ExpenseItem";
import ExpenseAdd from "../components/ExpenseAdd";
import useExpenses from "../hooks/useExpenses";

const Home = () => {
    const {
        expenses,
        loading,
        error,
        addExpense,
        resetExpenses
    } = useExpenses();

    if (loading) {
        return <p>Loading expenses...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>My Expenses</h1>

            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                />
            ))}

            <ExpenseAdd addExpense={addExpense} />

            <button onClick={resetExpenses}>
                Reset Data
            </button>
        </div>
    );
};

export default Home;
