import { useState, useMemo } from "react";
import ReportsFilters from "./ReportsFilters";
import RevenueLineChart from "./RevenueLineChart";
import SalesBarChart from "./SalesBarChart";
import RevenuePieChart from "./RevenuePieChart";

type FilterType = "all" | "last7" | "last30" | "last60";

const REPORT_DATA: Record<
  FilterType,
  { name: string; revenue: number; sales: number }[]
> = {
  all: [
    { name: "Jan", revenue: 14200, sales: 4000 },
    { name: "Feb", revenue: 15000, sales: 4200 },
    { name: "Mar", revenue: 17500, sales: 4500 },
    { name: "Apr", revenue: 19000, sales: 4700 },
    { name: "May", revenue: 21800, sales: 5200 },
  ],
  last60: [
    { name: "Sep", revenue: 18000, sales: 4800 },
    { name: "Oct", revenue: 21000, sales: 5300 },
  ],
  last30: [{ name: "Oct", revenue: 21000, sales: 5300 }],
  last7: [
    { name: "Mon", revenue: 2800, sales: 800 },
    { name: "Tue", revenue: 2900, sales: 900 },
    { name: "Wed", revenue: 3000, sales: 1000 },
    { name: "Thu", revenue: 2700, sales: 700 },
    { name: "Fri", revenue: 3500, sales: 1100 },
    { name: "Sat", revenue: 3800, sales: 1300 },
    { name: "Sun", revenue: 3600, sales: 900 },
  ],
};

const PIE_DATA = [
  { name: "Cash Sales", value: 45 },
  { name: "UPI Sales", value: 30 },
  { name: "Card Sales", value: 15 },
  { name: "Other", value: 10 },
];

const ReportsContainer = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  const chartData = useMemo(() => REPORT_DATA[filter], [filter]);

  return (
    <div className="space-y-10">
      <ReportsFilters value={filter} onChange={setFilter} />

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Revenue Trend
        </h2>
        <RevenueLineChart data={chartData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Sales Overview
          </h2>
          <SalesBarChart data={chartData} />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Revenue Breakdown
          </h2>
          <RevenuePieChart data={PIE_DATA} />
        </div>
      </div>
    </div>
  );
};

export default ReportsContainer;
