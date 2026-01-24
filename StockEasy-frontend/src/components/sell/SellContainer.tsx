import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomerSection, { CustomerPayload } from "./CustomerSection";
import SaleItemsSection, { SaleItem } from "./SaleItemsSection";
import SaleSummary from "./SaleSummary";
import { createSale } from "@/services/saleApi";
import { useToast } from "@/components/ui/use-toast";

const SellContainer = () => {
  const { toast } = useToast();

  const [customer, setCustomer] = useState<CustomerPayload | null>(null);
  const [items, setItems] = useState<SaleItem[]>([]);
  const [itemsValid, setItemsValid] = useState(false);
  const [totalQty, setTotalQty] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!customer || !itemsValid) return;

    try {
      setLoading(true);

      await createSale({
        customer: {
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
        },
        totalAmount,
        items: items.map((i) => ({
          medicineId: i.medicineId,
          quantity: i.quantity,
          sellPrice: i.sellPrice,
        })),
      });

      setSubmitted(true);

      toast({
        title: "Sale successful",
        description: "Transaction completed successfully",
      });
    } catch {
      toast({
        title: "Sale failed",
        description: "Unable to complete sale",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Customer */}
      <div className="col-span-1">
        <CustomerSection onValidated={setCustomer} />
      </div>

      {/* Sale */}
      <div className="col-span-3 space-y-4">
        {!submitted && (
          <>
            <SaleItemsSection
              onChange={(i, v, q, a) => {
                setItems(i);
                setItemsValid(v);
                setTotalQty(q);
                setTotalAmount(a);
              }}
            />

            <div className="flex justify-between text-sm">
              <span>Total Quantity: {totalQty}</span>
              <span>Total Amount: ₹{totalAmount.toFixed(2)}</span>
            </div>

            <Button
              className="w-full"
              disabled={!customer || !itemsValid || loading}
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : "Submit Sale"}
            </Button>
          </>
        )}

        {submitted && customer && (
          <SaleSummary
            customer={customer}
            items={items}
            totalQty={totalQty}
            totalAmount={totalAmount}
          />
        )}
      </div>
    </div>
  );
};

export default SellContainer;
