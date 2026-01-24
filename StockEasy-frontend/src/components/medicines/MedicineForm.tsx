import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  createMedicine,
  updateMedicine,
  Medicine,
} from "@/services/medicineApi";

type MedicineFormProps = {
  selectedMedicine: Medicine | null;
  onSuccess: () => void;
  onCancelEdit: () => void;
};

const MedicineForm = ({
  selectedMedicine,
  onSuccess,
  onCancelEdit,
}: MedicineFormProps) => {
  const { toast } = useToast();

  const [medicineName, setMedicineName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedMedicine) {
      setMedicineName(selectedMedicine.medicineName);
      setBrand(selectedMedicine.brand);
      setCategory(selectedMedicine.category);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMedicine]);

  const resetForm = () => {
    setMedicineName("");
    setBrand("");
    setCategory("");
  };

  const handleSubmit = async () => {
    if (!medicineName || !brand || !category) {
      toast({
        title: "Missing fields",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      if (selectedMedicine) {
        await updateMedicine(selectedMedicine.medicineId, {
          medicineName,
          brand,
          category,
        });

        toast({
          title: "Medicine updated",
          description: "Medicine details updated successfully",
        });
      } else {
        await createMedicine({
          medicineName,
          brand,
          category,
        });

        toast({
          title: "Medicine added",
          description: "New medicine created successfully",
        });
      }

      resetForm();
      onSuccess();
    } catch {
      toast({
        title: "Operation failed",
        description: "Unable to save medicine",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {selectedMedicine ? "Edit Medicine" : "Add Medicine"}
        </CardTitle>

        {selectedMedicine && (
          <Button variant="outline" size="sm" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />

        <Input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <Input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : selectedMedicine
            ? "Update Medicine"
            : "Add Medicine"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MedicineForm;
