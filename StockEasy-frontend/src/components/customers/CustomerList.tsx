// components/customers/CustomerList.tsx

import CustomerCard from "./CustomerCard";
import { Button } from "@/components/ui/button";
import {
  Customer,
  PaginatedCustomers,
} from "@/services/customerApi";

type Props = {
  data: PaginatedCustomers;
  loading: boolean;
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
  onViewHistory?: (customer: Customer) => void;
  onNext: () => void;
  onPrev: () => void;
};

const CustomerList = ({
  data,
  loading,
  onEdit,
  onDelete,
  onViewHistory,
  onNext,
  onPrev,
}: Props) => {
  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading customers...
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No customers found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.items.map((customer) => (
          <CustomerCard
            key={customer.customerId}
            customer={customer}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewHistory={onViewHistory}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <Button
          size="sm"
          variant="outline"
          onClick={onPrev}
          disabled={data.currentPage === 0}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {data.currentPage + 1} of {data.totalPages}
        </span>

        <Button
          size="sm"
          variant="outline"
          onClick={onNext}
          disabled={data.currentPage + 1 >= data.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CustomerList;
