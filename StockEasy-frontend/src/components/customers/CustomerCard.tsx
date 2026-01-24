import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Customer } from "@/services/customerApi";

type CustomerCardProps = {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: number) => void;
};

const CustomerCard = ({
  customer,
  onEdit,
  onDelete,
}: CustomerCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">
          {customer.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div>
          <strong>Phone:</strong> {customer.phone}
        </div>

        <div>
          <strong>Email:</strong> {customer.email || "-"}
        </div>

        <div className="flex gap-2 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(customer)}
          >
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(customer.customerId)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
