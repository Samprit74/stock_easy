// components/medicines/MedicineList.tsx

import MedicineCard from "./MedicineCard";
import { Button } from "@/components/ui/button";
import {
  Medicine,
  PaginatedMedicines,
} from "@/services/medicineApi";

type Props = {
  data: PaginatedMedicines;
  loading: boolean;
  onEdit: (medicine: Medicine) => void;
  onDelete: (id: number) => void;
  onNext: () => void;
  onPrev: () => void;
};

const MedicineList = ({
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
        Loading medicines...
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No medicines found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.items.map((medicine) => (
          <MedicineCard
            key={medicine.medicineId}
            medicine={medicine}
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

export default MedicineList;
