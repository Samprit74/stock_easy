import { useState } from "react";
import SupplierForm from "./SupplierForm";
import SupplierList from "./SupplierList";
import { Supplier } from "@/services/supplierApi";

const SuppliersContainer = () => {
  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setSelectedSupplier(null);
    setRefreshKey((prev) => prev + 1);
  };

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleCancelEdit = () => {
    setSelectedSupplier(null);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Form */}
      <div className="col-span-1">
        <SupplierForm
          selectedSupplier={selectedSupplier}
          onSuccess={handleSuccess}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {/* List */}
      <div className="col-span-2">
        <SupplierList
          key={refreshKey}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default SuppliersContainer;
