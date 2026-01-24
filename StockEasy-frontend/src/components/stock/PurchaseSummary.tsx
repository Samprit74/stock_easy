import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SupplierPayload } from "./VendorSection";
import { PurchaseItem } from "./PurchaseItemsSection";

type PurchaseSummaryProps = {
  supplier: SupplierPayload;
  items: PurchaseItem[];
};

const PurchaseSummary = ({ supplier, items }: PurchaseSummaryProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Purchase Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <strong>Vendor Name:</strong> {supplier.name}
        </div>
        <div>
          <strong>Phone:</strong> {supplier.phone}
        </div>
        <div>
          <strong>Email:</strong> {supplier.email || "-"}
        </div>

        <div className="pt-3">
          <strong>Items Purchased:</strong>
          <ul className="list-disc pl-5 space-y-1">
            {items.map((item, index) => (
              <li key={index}>
                Medicine ID {item.medicineId} | Qty {item.quantity} | Buy Price{" "}
                {item.buyPrice}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <strong>Total Items:</strong> {items.length}
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseSummary;
