import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerPayload } from "./CustomerSection";
import { SaleItem } from "./SaleItemsSection";

type SaleSummaryProps = {
  customer: CustomerPayload;
  items: SaleItem[];
  totalQty: number;
  totalAmount: number;
};

const SaleSummary = ({
  customer,
  items,
  totalQty,
  totalAmount,
}: SaleSummaryProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sale Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <strong>Customer Name:</strong> {customer.name}
        </div>
        <div>
          <strong>Phone:</strong> {customer.phone}
        </div>
        <div>
          <strong>Email:</strong> {customer.email || "-"}
        </div>

        <div className="pt-3">
          <strong>Items Sold:</strong>
          <ul className="list-disc pl-5 space-y-1">
            {items.map((item, index) => (
              <li key={index}>
                Medicine ID {item.medicineId} | Qty {item.quantity} | Price{" "}
                {item.sellPrice}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <strong>Total Quantity:</strong> {totalQty}
        </div>
        <div>
          <strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
};

export default SaleSummary;
