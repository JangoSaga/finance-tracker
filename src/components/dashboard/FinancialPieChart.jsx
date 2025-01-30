/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function FinancialPieChart({ data }) {
  // Custom label function to improve readability
  const renderLabel = ({ name, percent }) => {
    const percentage = (percent * 100).toFixed(0);
    return `${
      name.length > 10 ? name.slice(0, 10) + "..." : name
    }: ${percentage}%`;
  };

  return (
    <div className="p-6 flex flex-col text-center bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 text-gray-800">
        Income vs Expenses
      </h1>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={window.innerWidth < 640 ? 90 : 110} // Adjust for mobile
            innerRadius={60}
            paddingAngle={2}
            label={renderLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{
                  filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.15))",
                  cursor: "pointer",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              padding: "12px",
              fontSize: "14px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={50}
            iconType="circle"
            iconSize={12}
            wrapperStyle={{ paddingTop: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinancialPieChart;
