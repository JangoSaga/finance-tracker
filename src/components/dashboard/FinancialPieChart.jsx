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
  return (
    <div className="h-full p-8 flex flex-col text-center bg-white rounded-xl shadow-lg justify-center items-center">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Income vs Expenses
      </h1>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={70}
            paddingAngle={2}
            label={({ name, percent }) => {
              const percentage = (percent * 100).toFixed(0);
              return `${name}: ${percentage}%`;
            }}
            labelLine={{
              stroke: "#666666",
              strokeWidth: 1,
              strokeDasharray: "",
              offsetRadius: 20,
            }}
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
            height={45}
            iconType="circle"
            iconSize={10}
            formatter={(value) => (
              <span className="text-gray-700 text-sm font-medium">{value}</span>
            )}
            wrapperStyle={{
              paddingTop: "15px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinancialPieChart;
