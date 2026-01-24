import { useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import { Customer } from "@/services/customerApi";

const CustomersContainer = () => {
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setSelectedCustomer(null);
    setRefreshKey((prev) => prev + 1);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleCancelEdit = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Form */}
      <div className="col-span-1">
        <CustomerForm
          selectedCustomer={selectedCustomer}
          onSuccess={handleSuccess}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {/* List */}
      <div className="col-span-2">
        <CustomerList
          key={refreshKey}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default CustomersContainer;
