import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const data = [
  { name: "A", value: 1000 },
  { name: "B", value: 2000 },
  { name: "C", value: 3000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function BuyerProfileChart() {
  return (
    <div className="w-[20rem] h-[22rem] bg-neutral-900 p-4 rounded-sm border border-neutral-700 flex flex-col">
      <strong className="text-neutral-200 font-medium">Buyers Profile</strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              dataKey="value"
              labelLine={false}
              cx="50%"
              cy="45%"
              outerRadius={105}
              fill="#8884d8"
              label={renderCustomizedLabel}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
