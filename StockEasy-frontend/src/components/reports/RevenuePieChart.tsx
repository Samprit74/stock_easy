import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type PieDataPoint = {
  name: string;
  value: number;
};

type RevenuePieChartProps = {
  data: PieDataPoint[];
};

const COLORS = ["#FF7A00", "#FFB366", "#FFD1A3", "#FFE6CC"];

const RevenuePieChart = ({ data }: RevenuePieChartProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Revenue Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenuePieChart;
