import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import CustomerCard from "./CustomerCard";
import {
  getCustomers,
  deleteCustomer,
  Customer,
} from "@/services/customerApi";

type CustomerListProps = {
  onEdit: (customer: Customer) => void;
};

const CustomerList = ({ onEdit }: CustomerListProps) => {
  const { toast } = useToast();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
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
    fetchCustomers();
  }, []);

  const handleDelete = async (customerId: number) => {
    try {
      await deleteCustomer(customerId);
      toast({ title: "Customer deleted" });
      fetchCustomers();
    } catch {
      toast({
        title: "Delete failed",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No customers found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {customers.map((customer) => (
        <CustomerCard
          key={customer.customerId}
          customer={customer}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CustomerList;
