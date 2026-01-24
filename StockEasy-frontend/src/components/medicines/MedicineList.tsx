import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import MedicineCard from "./MedicineCard";
import {
  getMedicines,
  deleteMedicine,
  Medicine,
} from "@/services/medicineApi";

type MedicineListProps = {
  onEdit: (medicine: Medicine) => void;
};

const MedicineList = ({ onEdit }: MedicineListProps) => {
  const { toast } = useToast();

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const data = await getMedicines();
      setMedicines(data);
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
    fetchMedicines();
  }, []);

  const handleDelete = async (medicineId: number) => {
    try {
      await deleteMedicine(medicineId);
      toast({ title: "Medicine deleted" });
      fetchMedicines();
    } catch {
      toast({
        title: "Delete failed",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  if (medicines.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No medicines found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.medicineId}
          medicine={medicine}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MedicineList;
