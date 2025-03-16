// import FinancialPieChart from "../components/dashboard/FinancialPieChart";
import { useIncomes } from "../Features/incomes/useIncomes";
import { useExpenses } from "../Features/Expenses/useExpenses";
import FinancialPieChart from "../components/dashboard/FinancialPieChart";
import ExpensesByCategoryChart from "../components/dashboard/ExpensesByCategoryChart";
import IncomeSourcesChart from "../components/dashboard/IncomeSourcesChart";
import SavingsLineChart from "../components/dashboard/SavingsLineChart";
import Loading from "../components/Loading";
import { useSavings } from "../Features/Savings/useSavings";
import BudgetBarChart from "../components/dashboard/BudgetBarChart";
import { useBudget } from "../Features/Budgets/useBudget";

const Stl = {
  container: "p-6 space-y-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md",
  graphContainer: "flex flex-col gap-6",
  graph: "bg-white rounded-lg shadow-md w-full",
};

function Home() {
  const { incomes, isLoading: isLoadingIncomes } = useIncomes();
  const { expenses, isLoading: isLoadingExpenses } = useExpenses();
  const { savings, isLoading: isLoadingSavings } = useSavings();
  const { budgets, isLoading: isLoadingBudgets } = useBudget();
  const netIncome =
    incomes?.reduce((acc, income) => acc + income.amount, 0) || 0;
  const netExpenses =
    expenses?.reduce((acc, expense) => acc + expense.amount, 0) || 0;

  const incomeVsExpenseData = [
    { name: "Income", value: netIncome, color: "#4CAF50" },
    { name: "Expenses", value: netExpenses, color: "#F44336" },
  ];
  if (
    isLoadingIncomes ||
    isLoadingExpenses ||
    isLoadingSavings ||
    isLoadingBudgets
  )
    return <Loading />;
  return (
    <div className={Stl.container}>
      {expenses.length && incomes.length > 0 ? (
        <div className={Stl.graphContainer}>
          <h1 className="text-2xl font-bold mb-6">Financial Overview</h1>
          <div className={Stl.graph}>
            <ExpensesByCategoryChart expenses={expenses} />
          </div>
          <div className={Stl.graph}>
            <IncomeSourcesChart incomes={incomes} />
          </div>
          <div className={Stl.graph}>
            <FinancialPieChart data={incomeVsExpenseData} />
          </div>
          <div className={Stl.graph}>
            <SavingsLineChart savings={savings} />
          </div>
          <div className={Stl.graph}>
            <BudgetBarChart budgets={budgets} expenses={expenses} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-[60vh] gap-6 p-4">
          <img
            src="empty.png"
            alt="empty"
            className="grayscale w-full max-w-[280px] md:max-w-[320px] h-auto object-contain"
          />
          <p className="text-2xl font-bold text-center md:text-left">
            No data found
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
