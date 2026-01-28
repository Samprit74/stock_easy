// components/suppliers/SupplierList.tsx

import SupplierCard from "./SupplierCard";
import { Button } from "@/components/ui/button";
import {
  Supplier,
  PaginatedSuppliers,
} from "@/services/supplierApi";

type Props = {
  data: PaginatedSuppliers;
  loading: boolean;
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
  onNext: () => void;
  onPrev: () => void;
};

const SupplierList = ({
  data,
  loading,
  onEdit,
  onDelete,
  onNext,
  onPrev,
}: Props) => {
  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading suppliers...
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No suppliers found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.items.map((supplier) => (
          <SupplierCard
            key={supplier.supplierId}
            supplier={supplier}
            onEdit={onEdit}
            onDelete={onDelete}
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

export default SupplierList;
