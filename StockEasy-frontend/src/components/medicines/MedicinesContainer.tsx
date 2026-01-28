// components/medicines/MedicinesContainer.tsx

import { useEffect, useState } from "react";
import MedicineForm from "./MedicineForm";
import MedicineList from "./MedicineList";
import {
  Medicine,
  getMedicines,
  deleteMedicine,
  PaginatedMedicines,
} from "@/services/medicineApi";
import { useToast } from "@/components/ui/use-toast";

const MedicinesContainer = () => {
  const { toast } = useToast();

  const [selectedMedicine, setSelectedMedicine] =
    useState<Medicine | null>(null);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<PaginatedMedicines>({
    items: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  });

  const loadMedicines = async () => {
    try {
      setLoading(true);
      const res = await getMedicines(page, 5);
      setData(res);
    } catch {
      toast({
        title: "Failed to load medicines",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicines();
  }, [page]);

  const handleSuccess = () => {
    setSelectedMedicine(null);
    loadMedicines();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMedicine(id);
      toast({ title: "Medicine deleted" });
      loadMedicines();
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
      <MedicineForm
        selectedMedicine={selectedMedicine}
        onSuccess={handleSuccess}
        onCancelEdit={() => setSelectedMedicine(null)}
      />

      {/* List */}
      <div className="md:col-span-2">
        <MedicineList
          data={data}
          loading={loading}
          onEdit={setSelectedMedicine}
          onDelete={handleDelete}
          onNext={() => setPage((p) => p + 1)}
          onPrev={() => setPage((p) => Math.max(p - 1, 0))}
        />
      </div>
    </div>
  );
};

export default MedicinesContainer;
