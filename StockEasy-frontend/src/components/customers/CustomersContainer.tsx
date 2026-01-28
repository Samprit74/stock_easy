// components/customers/CustomersContainer.tsx

import { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import {
  Customer,
  getCustomers,
  deleteCustomer,
  PaginatedCustomers,
} from "@/services/customerApi";
import { useToast } from "@/components/ui/use-toast";

const CustomersContainer = () => {
  const { toast } = useToast();

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState<PaginatedCustomers>({
    items: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  });

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomers(page, 5);
      setCustomers(res);
    } catch {
      toast({
        title: "Failed to load customers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [page]);

  const handleSuccess = () => {
    setSelectedCustomer(null);
    loadCustomers();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCustomer(id);
      toast({ title: "Customer deleted" });
      loadCustomers();
    } catch {
      toast({
        title: "Delete failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Form */}
      <CustomerForm
        selectedCustomer={selectedCustomer}
        onSuccess={handleSuccess}
        onCancelEdit={() => setSelectedCustomer(null)}
      />

      {/* List */}
      <div className="md:col-span-2">
        <CustomerList
          data={customers}
          loading={loading}
          onEdit={setSelectedCustomer}
          onDelete={handleDelete}
          onNext={() => setPage((p) => p + 1)}
          onPrev={() => setPage((p) => Math.max(p - 1, 0))}
        />
      </div>
    </div>
  );
};

export default CustomersContainer;
