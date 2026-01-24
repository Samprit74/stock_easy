import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Supplier } from "@/services/supplierApi";

type SupplierCardProps = {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplierId: number) => void;
};

const SupplierCard = ({
  supplier,
  onEdit,
  onDelete,
}: SupplierCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">
          {supplier.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div>
          <strong>Phone:</strong> {supplier.phone}
        </div>

        <div>
          <strong>Email:</strong> {supplier.email || "-"}
        </div>

        <div className="flex gap-2 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(supplier)}
          >
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(supplier.supplierId)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierCard;
