/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function IncomeSourcesChart({ incomes }) {
  // Group incomes by source
  const sourceData = incomes?.reduce((acc, income) => {
    acc[income.source_name] = (acc[income.source_name] || 0) + income.amount;
    return acc;
  }, {});

  const data = Object.entries(sourceData || {}).map(([source, amount]) => ({
    name: source,
    value: amount,
  }));

  const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#FF9800"];

  // Custom label function for better visibility
  const renderLabel = ({ name, percent }) => {
    return `${name.length > 10 ? name.slice(0, 10) + "..." : name}: ${(
      percent * 100
    ).toFixed(0)}%`;
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 bg-white rounded-xl shadow-sm w-full mx-auto">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 text-gray-800">
        Income Sources
      </h1>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={window.innerWidth < 640 ? 90 : 110} // Adjust for mobile
            label={renderLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))" }}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          />
          <Legend verticalAlign="bottom" height={50} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeSourcesChart;
