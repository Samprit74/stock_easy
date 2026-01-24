import { useState } from "react";

import {
  Plus,
  Eye,
  ShoppingCart,
  Users,
  AlertTriangle,
  TrendingUp,
  Package,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Stock = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    batchNo: "",
    medName: "",
    manufacturer: "",
    mfgDate: "",
    expDate: "",
    price: "",
    quantity: "",
  });

  // For Sell Form
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone,setPhoneNumber]=useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saleItems, setSaleItems] = useState([
    { medName: "", batchNo: "", quantitySold: "", pricePerUnit: "", total: 0 },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);

  // --- Handlers ---
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRecord = () => {
    setShowForm(true);
    setShowSellForm(false);
  };

  const handleViewRecords = () => {
    setShowTable((prev) => !prev);
    setShowSellForm(false);
  };

  const handleSell = () => {
    setShowSellForm(true);
    setShowForm(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setRecords([...records, formData]);
    toast({
      title: "Record Added",
      description: `${formData.medName} added successfully!`,
    });
    setFormData({
      batchNo: "",
      medName: "",
      manufacturer: "",
      mfgDate: "",
      expDate: "",
      price: "",
      quantity: "",
    });
    setShowForm(false);
  };

  // --- Sell Logic ---
  const handleSaleChange = (index: number, field: string, value: string) => {
    const updated = [...saleItems];
    updated[index][field] = value;

    if (field === "medName") {
      const selectedMed = records.find((r) => r.medName === value);
      if (selectedMed) {
        updated[index].batchNo = selectedMed.batchNo;
        updated[index].pricePerUnit = selectedMed.price;
      }
    }

    // Auto total per item
    const qty = Number(updated[index].quantitySold);
    const price = Number(updated[index].pricePerUnit);
    updated[index].total = qty * price;

    // Update grand total
    const total = updated.reduce((sum, item) => sum + (item.total || 0), 0);
    setGrandTotal(total);
    setSaleItems(updated);
  };

  const handleAddSaleRow = () => {
    setSaleItems([
      ...saleItems,
      { medName: "", batchNo: "", quantitySold: "", pricePerUnit: "", total: 0 },
    ]);
  };

  const handleSellSubmit = (e: any) => {
    e.preventDefault();

    let updatedRecords = [...records];

    try {
      for (const sale of saleItems) {
        const medIndex = updatedRecords.findIndex(
          (r) => r.medName === sale.medName
        );
        if (medIndex === -1) continue;

        const newQty =
          parseInt(updatedRecords[medIndex].quantity) -
          parseInt(sale.quantitySold);
        if (newQty < 0)
          throw new Error(`Not enough stock for ${sale.medName}`);

        updatedRecords[medIndex].quantity = newQty.toString();
      }

      // Filter out zero-quantity items
      updatedRecords = updatedRecords.filter(
        (r) => parseInt(r.quantity) > 0
      );

      setRecords(updatedRecords);

      toast({
        title: "Sale Successful",
        description: `Total ₹${grandTotal} sold by ${email}.`,
      });

      // Reset form
      setCustomerName("");
      setEmail("");
      setSaleItems([
        { medName: "", batchNo: "", quantitySold: "", pricePerUnit: "", total: 0 },
      ]);
      setGrandTotal(0);
      setShowSellForm(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // --- Stats ---
  const stats = [
    {
      title: "Total Medicines",
      value: records.length.toString(),
      icon: <Package className="w-6 h-6" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Expiring Soon",
      value: "23",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Monthly Sales",
      value: `₹${grandTotal}`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Total Customers",
      value: "892",
      icon: <Users className="w-6 h-6" />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container-width py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Manage Stock
            </h1>
            <p className="text-muted-foreground">
              Manage your stock and pharmacy overview.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="card-primary hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={handleAddRecord}
            className="btn-primary flex items-center justify-center space-x-2 py-4"
          >
            <Plus className="w-5 h-5" />
            <span>Add Record</span>
          </button>
          <button
            onClick={handleViewRecords}
            className="btn-secondary flex items-center justify-center space-x-2 py-4"
          >
            <Eye className="w-5 h-5" />
            <span>View Record</span>
          </button>
          <button
            onClick={handleSell}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-medium transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Sell</span>
          </button>
        </div>

        {/* Add Record Form */}
        {showForm && (
          <div className="card-primary mb-10">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add Medicine Record
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { name: "batchNo", label: "Batch No" },
                { name: "medName", label: "Medicine Name" },
                { name: "manufacturer", label: "Manufacturer" },
                { name: "mfgDate", label: "Manufacture Date", type: "date" },
                { name: "expDate", label: "Expiry Date", type: "date" },
                { name: "price", label: "Price" },
                { name: "quantity", label: "Quantity" },
              ].map((input, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {input.label}
                  </label>
                  <input
                    required
                    type={input.type || "text"}
                    name={input.name}
                    value={(formData as any)[input.name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md mt-3 hover:bg-blue-700 transition"
              >
                Save Record
              </button>
            </form>
          </div>
        )}

        {/* Sell Form */}
        {showSellForm && (
          <div className="card-primary mb-10">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Sell Medicines
            </h2>
            <form onSubmit={handleSellSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label>Customer Name</label>
                  <input
                    required
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label>Phone No.</label>
                  <input type="number" 
                  value={phone}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              {saleItems.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-md p-4 mt-3 bg-gray-50"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    <select
                      required
                      value={item.medName}
                      onChange={(e) =>
                        handleSaleChange(i, "medName", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">Select Medicine</option>
                      {records.map((r, index) => (
                        <option key={index} value={r.medName}>
                          {r.medName}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={item.batchNo}
                      readOnly
                      className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                      placeholder="Batch No"
                    />

                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.quantitySold}
                      onChange={(e) =>
                        handleSaleChange(i, "quantitySold", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />

                    <input
                      type="number"
                      min="0"
                      placeholder="Price/Unit"
                      value={item.pricePerUnit}
                      onChange={(e) =>
                        handleSaleChange(i, "pricePerUnit", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />

                    <p className="text-right font-semibold pt-2">
                      ₹{item.total}
                    </p>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddSaleRow}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                + Add Another Medicine
              </button>

              <h3 className="text-lg font-bold text-right mt-4">
                Grand Total: ₹{grandTotal}
              </h3>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md mt-3 hover:bg-green-700 transition"
              >
                Confirm Sale
              </button>
            </form>
          </div>
        )}

        {/* Table for Records */}
        {showTable && (
          <div className="card-primary mb-10">
            <h2 className="text-xl font-semibold mb-4">Added Records</h2>
            {records.length === 0 ? (
              <p className="text-muted-foreground">No records available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-700">
                      <th className="py-2 px-3 border">Batch No</th>
                      <th className="py-2 px-3 border">Medicine Name</th>
                      <th className="py-2 px-3 border">Manufacturer</th>
                      <th className="py-2 px-3 border">Mfg Date</th>
                      <th className="py-2 px-3 border">Exp Date</th>
                      <th className="py-2 px-3 border">Price</th>
                      <th className="py-2 px-3 border">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2 px-3 border">{r.batchNo}</td>
                        <td className="py-2 px-3 border">{r.medName}</td>
                        <td className="py-2 px-3 border">{r.manufacturer}</td>
                        <td className="py-2 px-3 border">{r.mfgDate}</td>
                        <td className="py-2 px-3 border">{r.expDate}</td>
                        <td className="py-2 px-3 border">₹{r.price}</td>
                        <td className="py-2 px-3 border">{r.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Stock;
