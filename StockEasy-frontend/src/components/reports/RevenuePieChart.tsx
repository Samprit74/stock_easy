import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

const COLORS = ["#FF7A00", "#FFB366", "#FFD1A3", "#FFE6CC"];

const RevenuePieChart = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No revenue breakdown available
      </div>
    );
  }

  return (
    <>
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
                key={index}
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
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default RevenuePieChart;
