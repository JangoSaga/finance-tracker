/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCategories } from "../../Features/categories/useCategories";

function BudgetBarChart({ budgets, expenses }) {
  const [timeFrame, setTimeFrame] = useState("monthly");
  const { categories } = useCategories();

  // Prepare data by combining budgets and actual expenses
  const prepareData = () => {
    const budgetData = {};

    // Process budgets
    budgets.forEach((budget) => {
      const category = categories?.find(
        (c) => c.category_id === budget.category_id
      );
      const categoryName = category?.category_name || "Uncategorized";
      if (!budgetData[categoryName]) {
        budgetData[categoryName] = {
          category: categoryName,
          budgeted: 0,
          actual: 0,
        };
      }

      let adjustedAmount = Number(budget.amount);
      switch (timeFrame) {
        case "yearly":
          adjustedAmount = adjustBudgetToYearly(budget);
          break;
        case "monthly":
          adjustedAmount = adjustBudgetToMonthly(budget);
          break;
        case "weekly":
          adjustedAmount = adjustBudgetToWeekly(budget);
          break;
        default:
          break;
      }

      budgetData[categoryName].budgeted += adjustedAmount;
    });

    // Process expenses
    expenses.forEach((expense) => {
      const category = categories?.find(
        (c) => c.category_id === expense.category_id
      );
      const categoryName = category?.category_name || "Uncategorized expense";
      if (!budgetData[categoryName]) {
        budgetData[categoryName] = {
          category: categoryName,
          budgeted: 0,
          actual: 0,
        };
      }
      budgetData[categoryName].actual += Number(expense.amount);
    });

    return Object.values(budgetData);
  };

  // Helper functions to adjust budget amounts based on frequency
  const adjustBudgetToYearly = (budget) => {
    switch (budget.type) {
      case "daily":
        return Number(budget.amount) * 365;
      case "weekly":
        return Number(budget.amount) * 52;
      case "monthly":
        return Number(budget.amount) * 12;
      case "yearly":
        return Number(budget.amount);
      default:
        return Number(budget.amount);
    }
  };

  const adjustBudgetToMonthly = (budget) => {
    switch (budget.type) {
      case "daily":
        return Number(budget.amount) * 30;
      case "weekly":
        return Number(budget.amount) * 4;
      case "monthly":
        return Number(budget.amount);
      case "yearly":
        return Number(budget.amount) / 12;
      default:
        return Number(budget.amount);
    }
  };

  const adjustBudgetToWeekly = (budget) => {
    switch (budget.type) {
      case "daily":
        return Number(budget.amount) * 7;
      case "weekly":
        return Number(budget.amount);
      case "monthly":
        return Number(budget.amount) / 4;
      case "yearly":
        return Number(budget.amount) / 52;
      default:
        return Number(budget.amount);
    }
  };

  const data = prepareData();

  return (
    <div className="flex flex-col justify-center items-center w-full p-2">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          Budget vs Actual Spending
        </h1>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }} // Adjust tick size for mobile
          />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              `$${value.toLocaleString()}`,
              name === "budgeted" ? "Budget" : "Actual",
            ]}
            labelFormatter={(label) => `Category: ${label}`}
          />
          <Bar dataKey="budgeted" fill="#82ca9d" name="Budget" barSize={30} />
          <Bar dataKey="actual" fill="#8884d8" name="Actual" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BudgetBarChart;
