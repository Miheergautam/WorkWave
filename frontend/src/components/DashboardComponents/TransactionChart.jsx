import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Expense: 4000, Income: 2400 },
  { name: "Feb", Expense: 3000, Income: 1398 },
  { name: "Mar", Expense: 2000, Income: 9800 },
  { name: "Apr", Expense: 2780, Income: 3908 },
  { name: "May", Expense: 1890, Income: 4800 },
  { name: "Jun", Expense: 2390, Income: 3800 },
  { name: "Jul", Expense: 3490, Income: 4300 },
  { name: "Aug", Expense: 3000, Income: 2100 },
  { name: "Sep", Expense: 4200, Income: 3200 },
  { name: "Oct", Expense: 2900, Income: 2500 },
  { name: "Nov", Expense: 3200, Income: 2900 },
  { name: "Dec", Expense: 3500, Income: 3100 },
]; /* do something with the responsive Container when barchart is inside the container it */

export function TransactionChart() {
  return (
    <div className="h-[22rem] bg-neutral-900 p-4 rounded-sm border border-neutral-700 flex flex-col flex-1">
      <strong className="text-neutral-200 font-medium">Finance</strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              horizontal={false}
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#8884d8" />
            <Bar dataKey="Expense" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
