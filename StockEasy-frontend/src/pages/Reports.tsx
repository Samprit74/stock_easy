import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const COLORS = ["#FF7A00", "#FFB366", "#FFD1A3", "#FFE6CC"];

const allData = {
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
  last30: [
    { name: "Oct", revenue: 21000, sales: 5300 },
  ],
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

const pieData = [
  { name: "Downloads", value: 28 },
  { name: "Users", value: 22 },
  { name: "Subscribes", value: 37 },
  { name: "Products", value: 13 },
];

const Reports = () => {
  const [filter, setFilter] = useState("all");

  const chartData =
    filter === "last7"
      ? allData.last7
      : filter === "last30"
      ? allData.last30
      : filter === "last60"
      ? allData.last60
      : allData.all;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navigation />

      <div className="container mx-auto px-6 py-10">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-orange-600 mb-6 text-center">
          Revenue & Sales Report
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { label: "All", key: "all" },
            { label: "Last 60 Days", key: "last60" },
            { label: "Last 30 Days", key: "last30" },
            { label: "Last 7 Days", key: "last7" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === item.key
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-orange-300 text-orange-500 hover:bg-orange-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FF7A00"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie + Bar Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Revenue Breakdown</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center mt-4 gap-3 text-sm text-gray-600">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Sales Overview</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#FF7A00" barSize={40} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reports;
