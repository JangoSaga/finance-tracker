/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

function SavingsLineChart({ savings }) {
  const [timeFrame, setTimeFrame] = useState("monthly"); // 'weekly', 'monthly', 'yearly'

  // Group savings by selected time frame
  const groupedData = (savings || []).reduce((acc, saving) => {
    const date = new Date(saving.date);
    let key;

    switch (timeFrame) {
      case "weekly": {
        // Get week number and year
        const weekNumber = getWeekNumber(date);
        const year = date.getFullYear();
        key = `${year} - Week ${weekNumber}`;
        break;
      }
      case "monthly":
        key = date.toLocaleString("default", { month: "short" });
        break;
      case "yearly":
        key = date.getFullYear().toString();
        break;
      default:
        key = date.toLocaleString("default", { month: "short" });
    }

    if (!acc[key]) {
      acc[key] = {
        period: key,
        total: 0,
        byDescription: {},
      };
    }

    // Add to total
    acc[key].total += Number(saving.amount);

    // Group by description
    const description = saving.description || "Uncategorized";
    if (!acc[key].byDescription[description]) {
      acc[key].byDescription[description] = 0;
    }
    acc[key].byDescription[description] += Number(saving.amount);

    return acc;
  }, {});

  // Convert grouped data to array format
  const data = Object.values(groupedData).map(
    ({ period, byDescription, total }) => ({
      period,
      total,
      ...byDescription,
    })
  );

  // Get unique descriptions for legend
  const uniqueDescriptions = [
    ...new Set(savings?.map((s) => s.description || "Uncategorized")),
  ];

  // Helper function to get week number
  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-4">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {timeFrame === "weekly"
            ? "Weekly Savings"
            : timeFrame === "monthly"
            ? "Monthly Savings"
            : "Yearly Savings"}
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

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip
            formatter={(value, name) => {
              if (name === "total") {
                return [`$${value.toLocaleString()}`, "Total Savings"];
              }
              return [`$${value.toLocaleString()}`, name];
            }}
            labelFormatter={(label) => `Period: ${label}`}
          />

          {/* Line for total savings */}
          <Line
            type="monotone"
            dataKey="total"
            name="total"
            stroke="#2196F3"
            strokeWidth={2}
          />

          {/* Lines for each description */}
          {uniqueDescriptions.map((description, index) => (
            <Line
              key={description}
              type="monotone"
              dataKey={description}
              name={description}
              stroke={`hsl(${(index * 137) % 360}, 70%, 50%)`}
              strokeDasharray="5 5"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SavingsLineChart;
