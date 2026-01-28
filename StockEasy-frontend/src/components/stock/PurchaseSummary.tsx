import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SupplierPayload } from "./VendorSection";
import { PurchaseItem } from "./PurchaseItemsSection";

type Props = {
  supplier: SupplierPayload;
  items: PurchaseItem[];
};

const PurchaseSummary = ({ supplier, items }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div><strong>Vendor:</strong> {supplier.name}</div>
        <div><strong>Phone:</strong> {supplier.phone}</div>
        <div><strong>Email:</strong> {supplier.email || "-"}</div>

        <div className="pt-2">
          <strong>Items:</strong>
          <ul className="list-disc pl-5">
            {items.map((i, idx) => (
              <li key={idx}>
                Medicine ID {i.medicineId} | Qty {i.quantity} | Buy ₹{i.buyPrice}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseSummary;
