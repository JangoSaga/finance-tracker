/* eslint-disable react/prop-types */
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

function ExpensesByCategoryChart({ expenses }) {
  console.log(expenses);
  const { categories } = useCategories();
  console.log(categories);
  // Group expenses by category
  const categoryData = expenses
    ?.filter((expense) => expense.category_id !== null)
    ?.reduce((acc, expense) => {
      const categoryName = categories?.find(
        (category) => category.category_id === expense.category_id
      )?.category_name;
      acc[categoryName] = (acc[categoryName] || 0) + expense.amount;
      return acc;
    }, {});

  const data = Object.entries(categoryData || {}).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-xl font-bold mb-6 text-gray-800">
        Expenses by Category
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="category"
            tick={{ fill: "#666" }}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <YAxis
            tick={{ fill: "#666" }}
            axisLine={{ stroke: "#e0e0e0" }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey="amount"
            fill="#F44336"
            radius={[4, 4, 0, 0]}
            maxBarSize={80}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensesByCategoryChart;
