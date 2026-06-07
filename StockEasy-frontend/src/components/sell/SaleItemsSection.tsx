import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag, Sparkles } from "lucide-react";
import {
  getMedicines,
  getBatchesByMedicine,
  previewDiscountByExpiry,
} from "@/services";
import { getErrorMessage, isApiError } from "@/services";
import type { BatchItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

export type SaleItem = {
  medicineId: number;
  quantity: number;
  sellPrice: number;
};

type Props = {
  onChange: (
    items: SaleItem[],
    valid: boolean,
    totalQty: number,
    totalAmount: number
  ) => void;
};

const emptyItem: SaleItem = {
  medicineId: 0,
  quantity: 0,
  sellPrice: 0,
};

const SaleItemsSection = ({ onChange }: Props) => {
  const { toast } = useToast();

  const [medicines, setMedicines] = useState<{ medicineId: number; medicineName: string; defaultSellPrice: number | null }[]>([]);
  const [items, setItems] = useState<SaleItem[]>([emptyItem]);
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState<Record<number, BatchItem[]>>({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getMedicines(0, 200);
        setMedicines(res.items);
      } catch (e) {
        toast({
          title: "Failed to load medicines",
          description: getErrorMessage(e),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  useEffect(() => {
    const valid =
      items.length > 0 &&
      items.every((i) => i.medicineId > 0 && i.quantity > 0 && i.sellPrice > 0);
    const totalQty = items.reduce((s, i) => s + i.quantity, 0);
    const totalAmount = items.reduce(
      (s, i) => s + i.quantity * i.sellPrice,
      0
    );
    onChange(items, valid, totalQty, totalAmount);
  }, [items, onChange]);

  const loadBatchesForMedicine = async (medicineId: number) => {
    if (batches[medicineId] || medicineId <= 0) return;
    try {
      const list = await getBatchesByMedicine(medicineId);
      setBatches((prev) => ({ ...prev, [medicineId]: list }));
    } catch (e) {
      if (!(isApiError(e) && e.status === 404)) {
        toast({
          title: "Failed to load batches",
          description: getErrorMessage(e),
          variant: "destructive",
        });
      }
    }
  };

  const updateItem = (
    index: number,
    field: keyof SaleItem,
    value: number
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);

    if (field === "medicineId") {
      loadBatchesForMedicine(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sale Items</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.map((item, index) => {
          const med = medicines.find((m) => m.medicineId === item.medicineId);
          const itemBatches = batches[item.medicineId] ?? [];
          const sortedByExpiry = [...itemBatches].sort(
            (a, b) =>
              new Date(a.expiryDate ?? 0).getTime() -
              new Date(b.expiryDate ?? 0).getTime()
          );
          return (
            <div key={index} className="border p-3 rounded space-y-3">
              <div className="grid grid-cols-4 gap-3">
                <Select
                  value={item.medicineId ? String(item.medicineId) : ""}
                  onValueChange={(v) => updateItem(index, "medicineId", Number(v))}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Medicine" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicines.map((m) => (
                      <SelectItem key={m.medicineId} value={String(m.medicineId)}>
                        {m.medicineName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity || ""}
                  onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                />

                <Input
                  type="number"
                  placeholder="Sell Price"
                  value={item.sellPrice || ""}
                  onChange={(e) => updateItem(index, "sellPrice", Number(e.target.value))}
                />

                <Button
                  variant="destructive"
                  disabled={items.length === 1}
                  onClick={() => setItems(items.filter((_, i) => i !== index))}
                >
                  Remove
                </Button>
              </div>

              {med && med.defaultSellPrice != null && item.sellPrice === 0 && (
                <p className="text-xs text-muted-foreground">
                  Default MRP: ₹{med.defaultSellPrice.toFixed(2)} (leave 0 to use)
                </p>
              )}

              {sortedByExpiry.length > 0 && (
                <div className="text-xs">
                  <p className="font-semibold mb-1 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Available batches
                    (oldest expiry first — FEFO will pick from these)
                  </p>
                  <ul className="space-y-1 max-h-32 overflow-y-auto">
                    {sortedByExpiry.slice(0, 5).map((b) => (
                      <BatchHint key={b.batchItemId} batch={b} sellPrice={item.sellPrice} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        <Button
          className="w-full"
          onClick={() => setItems([...items, emptyItem])}
          disabled={loading}
        >
          + Add Item
        </Button>
      </CardContent>
    </Card>
  );
};

function BatchHint({ batch, sellPrice }: { batch: BatchItem; sellPrice: number }) {
  const [discount, setDiscount] = useState<{ pct: number; final: number } | null>(null);

  useEffect(() => {
    if (!batch.expiryDate || sellPrice <= 0) return;
    let cancelled = false;
    previewDiscountByExpiry(batch.expiryDate, sellPrice)
      .then((d) => {
        if (!cancelled && d.discountPercent > 0) {
          setDiscount({ pct: d.discountPercent, final: d.finalPrice });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [batch.expiryDate, sellPrice]);

  return (
    <li className="flex items-center justify-between border-b py-0.5">
      <span>
        Batch {batch.batchNumber ?? "—"} · exp {batch.expiryDate} ·{" "}
        {batch.quantityAvailable} left
      </span>
      {discount && (
        <Badge className="bg-green-600 gap-1">
          <Sparkles className="w-3 h-3" /> {discount.pct}% off → ₹
          {discount.final.toFixed(2)}
        </Badge>
      )}
    </li>
  );
}

export default SaleItemsSection;
