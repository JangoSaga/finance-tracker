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

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Income Sources</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={true}
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
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-gray-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeSourcesChart;
