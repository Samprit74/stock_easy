import { useState } from "react";
import MedicineForm from "./MedicineForm";
import MedicineList from "./MedicineList";
import { Medicine } from "@/services/medicineApi";

const MedicinesContainer = () => {
  const [selectedMedicine, setSelectedMedicine] =
    useState<Medicine | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setSelectedMedicine(null);
    setRefreshKey((prev) => prev + 1);
  };

  const handleEdit = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleCancelEdit = () => {
    setSelectedMedicine(null);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Form */}
      <div className="col-span-1">
        <MedicineForm
          selectedMedicine={selectedMedicine}
          onSuccess={handleSuccess}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {/* List */}
      <div className="col-span-2">
        <MedicineList key={refreshKey} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default MedicinesContainer;
