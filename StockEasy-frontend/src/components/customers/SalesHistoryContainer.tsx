import { useMemo, useState } from "react";

type SaleItem = {
  medicineName: string;
  quantity: number;
  price: number;
};

type SaleRecord = {
  id: number;
  customerName: string;
  phone: string;
  date: string;
  items: SaleItem[];
  totalAmount: number;
};

const DUMMY_SALES: SaleRecord[] = [
  {
    id: 1,
    customerName: "Rohit Das",
    phone: "9876543210",
    date: "2025-11-01",
    items: [
      { medicineName: "Paracetamol", quantity: 2, price: 20 },
      { medicineName: "Cetrizine", quantity: 1, price: 10 },
    ],
    totalAmount: 50,
  },
  {
    id: 2,
    customerName: "Ananya Roy",
    phone: "9087654321",
    date: "2025-11-02",
    items: [{ medicineName: "Amoxicillin", quantity: 1, price: 90 }],
    totalAmount: 90,
  },
];

const SalesHistoryContainer = () => {
  const [sales] = useState(DUMMY_SALES);

  const totalRevenue = useMemo(
    () => sales.reduce((sum, s) => sum + s.totalAmount, 0),
    [sales]
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sales Records</h2>
        <span className="text-green-600 font-semibold">
          Total: ₹{totalRevenue}
        </span>
      </div>

      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Items</th>
            <th className="p-3 text-right">Total</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-t">
              <td className="p-3 font-medium">{sale.customerName}</td>
              <td className="p-3">{sale.phone}</td>
              <td className="p-3">{sale.date}</td>
              <td className="p-3">
                {sale.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.medicineName}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </td>
              <td className="p-3 text-right font-semibold text-green-600">
                ₹{sale.totalAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistoryContainer;
