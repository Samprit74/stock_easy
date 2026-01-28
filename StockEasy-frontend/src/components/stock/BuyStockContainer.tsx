import { useState } from "react";
import { Button } from "@/components/ui/button";
import VendorSection, { SupplierPayload } from "./VendorSection";
import PurchaseItemsSection, {
  PurchaseItem,
} from "./PurchaseItemsSection";
import PurchaseSummary from "./PurchaseSummary";
import { createPurchase } from "@/services/purchaseApi";
import { useToast } from "@/components/ui/use-toast";

const BuyStockContainer = () => {
  const { toast } = useToast();

  const [supplier, setSupplier] = useState<SupplierPayload | null>(null);
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [itemsValid, setItemsValid] = useState(false);
  const [totalQty, setTotalQty] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!supplier || !itemsValid) return;

    try {
      setLoading(true);

      await createPurchase({
        supplierId: supplier.supplierId,
        invoiceNo: `INV-${Date.now()}`,
        purchaseDate: new Date().toISOString().split("T")[0],
        items,
      });

      setSubmitted(true);
      toast({ title: "Purchase successful" });
    } catch {
      toast({
        title: "Purchase failed",
        description: "Unable to save purchase batch",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Vendor */}
      <div className="md:col-span-1">
        <VendorSection onValidated={setSupplier} />
      </div>

      {/* Purchase */}
      <div className="md:col-span-3 space-y-4">
        {!submitted && (
          <>
            <PurchaseItemsSection
              onChange={(i, v, q, c) => {
                setItems(i);
                setItemsValid(v);
                setTotalQty(q);
                setTotalCost(c);
              }}
            />

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total Quantity: {totalQty}</span>
              <span>Total Cost: ₹{totalCost.toFixed(2)}</span>
            </div>

            <Button
              className="w-full"
              disabled={!supplier || !itemsValid || loading}
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : "Submit Purchase"}
            </Button>
          </>
        )}

        {submitted && supplier && (
          <PurchaseSummary supplier={supplier} items={items} />
        )}
      </div>
    </div>
  );
};

export default BuyStockContainer;
