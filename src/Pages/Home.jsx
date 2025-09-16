// import FinancialPieChart from "../components/dashboard/FinancialPieChart";
import { useIncomes } from "../Features/incomes/useIncomes";
import { useExpenses } from "../Features/Expenses/useExpenses";
import Loading from "../components/Loading";
import { useSavings } from "../Features/Savings/useSavings";
import { useBudget } from "../Features/Budgets/useBudget";
import { MdOutlineSavings } from "react-icons/md";
import { GiCash, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useEffect, useState } from "react";
import FinancialPieChart from "../components/dashboard/FinancialPieChart";
import ExpensesByCategoryChart from "../components/dashboard/ExpensesByCategoryChart";
import IncomeSourcesChart from "../components/dashboard/IncomeSourcesChart";

const Stl = {
  container: "p-6 space-y-6  mx-auto bg-white rounded-lg shadow-md",
  graphContainer: "flex flex-col gap-6",
  graph: "bg-white rounded-lg shadow-md w-full",
};

function Home() {
  const { incomes, isLoading: isLoadingIncomes } = useIncomes();
  const { expenses, isLoading: isLoadingExpenses } = useExpenses();
  const { savings, isLoading: isLoadingSavings } = useSavings();
  const { budgets, isLoading: isLoadingBudgets } = useBudget();
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const netIncome =
    incomes?.reduce((acc, income) => acc + income.amount, 0) || 0;
  useEffect(() => {
    function totalSavings() {
      let s = 0;
      for (let i = 0; i < savings?.length; i++) {
        s += savings[i]?.amount;
      }
      setTotalSavings(s);
    }
    totalSavings();
  }, [savings]);
  useEffect(() => {
    function totalBudget() {
      let s = 0;
      for (let i = 0; i < budgets?.length; i++) {
        s += budgets[i]?.amount;
      }
      setTotalBudget(s);
    }
    totalBudget();
  }, [budgets]);
  useEffect(() => {
    function totalBalance() {
      let s = 0;
      for (let i = 0; i < expenses?.length; i++) {
        s += expenses[i]?.amount;
      }
      setTotalExpense(s);
    }
    totalBalance();
  }, [expenses]);

  const incomeVsExpenseData = [
    { name: "Income", value: netIncome, color: "#4CAF50" },
    { name: "Expenses", value: totalExpense, color: "#F44336" },
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
          <h1 className="text-3xl font-bold text-center">Financial Overview</h1>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-3 p-2 rounded-lg font-semibold text-2xl ">
            <div className="bg-green-300 p-4 rounded-lg flex flex-col items-center gap-2">
              <GiReceiveMoney className="text-7xl" />
              <span> Income</span>${netIncome}
            </div>
            <div className="bg-red-100 p-4 rounded-lg flex flex-col items-center gap-2 ">
              <GiPayMoney className="text-7xl" />
              <span>Expense</span>${totalExpense}
            </div>
            <div className="bg-violet-100 p-4 rounded-lg flex flex-col items-center gap-2">
              <MdOutlineSavings className="text-7xl" />
              <span>Savings</span>${totalSavings}
            </div>
            <div className="bg-amber-100 p-4 rounded-lg flex flex-col items-center gap-2">
              <GiCash className="text-7xl" />
              <span>Budget</span>${totalBudget}
            </div>
          </div>
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
