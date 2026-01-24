import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Medicine } from "@/services/medicineApi";

type MedicineCardProps = {
  medicine: Medicine;
  onEdit: (medicine: Medicine) => void;
  onDelete: (medicineId: number) => void;
};

const MedicineCard = ({
  medicine,
  onEdit,
  onDelete,
}: MedicineCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">
          {medicine.medicineName}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div>
          <strong>Brand:</strong> {medicine.brand}
        </div>
        <div>
          <strong>Category:</strong> {medicine.category}
        </div>

        <div className="flex gap-2 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(medicine)}
          >
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(medicine.medicineId)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;
