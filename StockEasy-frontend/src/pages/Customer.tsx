



import React, { useState, useMemo } from "react";
import { CalendarDays, Users, ShoppingBag, IndianRupee } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface SaleItem {
    medName: string;
    quantity: number;
    price: number;
}

interface CustomerRecord {
    id: number;
    name: string;
    phone: string;
    email: string;
    date: string; // YYYY-MM-DD
    items: SaleItem[];
    totalPrice: number;
}

const Customer: React.FC = () => {
    const [filter, setFilter] = useState("all");
    const [customDate, setCustomDate] = useState("");

    // 🧾 Dummy data for now
    const [customers] = useState<CustomerRecord[]>([
        {
            id: 1,
            name: "Rohit Das",
            phone: "9876543210",
            email: "rohit@gmail.com",
            date: "2025-10-15",
            items: [
                { medName: "Paracetamol", quantity: 2, price: 20 },
                { medName: "Cetrizine", quantity: 1, price: 10 },
            ],
            totalPrice: 50,
        },
        {
            id: 2,
            name: "Ananya Roy",
            phone: "9087654321",
            email: "ananya@gmail.com",
            date: "2025-11-01",
            items: [
                { medName: "Amoxicillin", quantity: 3, price: 90 },
                { medName: "Calpol", quantity: 2, price: 40 },
            ],
            totalPrice: 130,
        },
        {
            id: 3,
            name: "Sayan Ghosh",
            phone: "9001122334",
            email: "sayan@gmail.com",
            date: "2025-11-02",
            items: [{ medName: "Azithromycin", quantity: 1, price: 60 }],
            totalPrice: 60,
        },
    ]);

    // 🔍 Filtering Logic
    const filteredCustomers = useMemo(() => {
        let filtered = customers;
        const now = new Date();

        if (filter !== "all") {
            let days = 0;
            if (filter === "7") days = 7;
            if (filter === "30") days = 30;
            if (filter === "45") days = 45;

            filtered = filtered.filter((c) => {
                const saleDate = new Date(c.date);
                const diffDays =
                    (now.getTime() - saleDate.getTime()) / (1000 * 3600 * 24);
                return diffDays <= days;
            });
        }

        if (customDate) {
            filtered = filtered.filter((c) => c.date === customDate);
        }

        return filtered;
    }, [filter, customDate, customers]);

    // 💰 Stats
    const totalSales = filteredCustomers.reduce(
        (sum, c) => sum + c.totalPrice,
        0
    );
    const totalCustomers = filteredCustomers.length;
    const totalMedicines = filteredCustomers.reduce(
        (sum, c) => sum + c.items.reduce((x, i) => x + i.quantity, 0),
        0
    );

    const monthlyTotal = useMemo(() => {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();

        return customers
            .filter((c) => {
                const d = new Date(c.date);
                return d.getMonth() === month && d.getFullYear() === year;
            })
            .reduce((sum, c) => sum + c.totalPrice, 0);
    }, [customers]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="container-width py-8">
                <h1 className="text-3xl font-bold text-black-600 mb-8 text-center">
                    Customer & Sales Overview
                </h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        {
                            title: "Monthly Total Sales",
                            value: `₹${monthlyTotal}`,
                            icon: <IndianRupee className="w-6 h-6 text-green-600" />,
                            bg: "bg-green-50",
                        },
                        {
                            title: "Total Customers",
                            value: totalCustomers,
                            icon: <Users className="w-6 h-6 text-blue-600" />,
                            bg: "bg-blue-50",
                        },
                        {
                            title: "Total Medicines Sold",
                            value: totalMedicines,
                            icon: <ShoppingBag className="w-6 h-6 text-purple-600" />,
                            bg: "bg-purple-50",
                        },
                        {
                            title: "Total Sales (Filtered)",
                            value: `₹${totalSales}`,
                            icon: <CalendarDays className="w-6 h-6 text-orange-600" />,
                            bg: "bg-orange-50",
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-between p-5 rounded-xl shadow-sm hover:shadow-md transition ${card.bg}`}
                        >
                            <div>
                                <p className="text-sm text-gray-600">{card.title}</p>
                                <h2 className="text-xl font-bold mt-1 text-gray-800">
                                    {card.value}
                                </h2>
                            </div>
                            <div className="p-3 bg-white rounded-lg shadow-sm">{card.icon}</div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <label className="text-gray-700 font-medium">Quick Filter:</label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Time</option>
                            <option value="7">Last 7 Days</option>
                            <option value="30">Last 30 Days</option>
                            <option value="45">Last 45 Days</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-gray-700 font-medium">Filter by Date:</label>
                        <input
                            type="date"
                            value={customDate}
                            onChange={(e) => setCustomDate(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                        {customDate && (
                            <button
                                onClick={() => setCustomDate("")}
                                className="px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white shadow-md rounded-xl overflow-hidden">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-orange-500 text-white">
                            <tr>
                                <th className="p-3 text-left">Customer Name</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Medicines</th>
                                <th className="p-3 text-left">Total (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-6 text-gray-500 font-medium"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredCustomers.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="border-b hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-3 font-medium">{c.name}</td>
                                        <td className="p-3">{c.phone}</td>
                                        <td className="p-3">{c.email}</td>
                                        <td className="p-3">{c.date}</td>
                                        <td className="p-3">
                                            {c.items.map((i) => (
                                                <div
                                                    key={i.medName}
                                                    className="text-sm text-gray-700 flex justify-between"
                                                >
                                                    <span>{i.medName}</span>
                                                    <span>x{i.quantity}</span>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="p-3 font-semibold text-green-600">
                                            ₹{c.totalPrice}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Customer;
