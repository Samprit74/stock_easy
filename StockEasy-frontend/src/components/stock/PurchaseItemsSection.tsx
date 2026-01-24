import { useEffect, useState } from "react";
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
import { getMedicines } from "@/services/medicineApi";

export type PurchaseItem = {
  medicineId: number;
  quantity: number;
  buyPrice: number;
  manufactureDate: string;
  expiryDate: string;
};

type Medicine = {
  medicineId: number;
  medicineName: string;
};

type PurchaseItemsSectionProps = {
  onChange: (
    items: PurchaseItem[],
    valid: boolean,
    totalQty: number,
    totalCost: number
  ) => void;
};

const emptyItem: PurchaseItem = {
  medicineId: 0,
  quantity: 0,
  buyPrice: 0,
  manufactureDate: "",
  expiryDate: "",
};

const PurchaseItemsSection = ({ onChange }: PurchaseItemsSectionProps) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [items, setItems] = useState<PurchaseItem[]>([emptyItem]);

  useEffect(() => {
    getMedicines().then(setMedicines);
  }, []);

  useEffect(() => {
    const valid = items.every(
      (i) =>
        i.medicineId > 0 &&
        i.quantity > 0 &&
        i.buyPrice > 0 &&
        i.manufactureDate &&
        i.expiryDate
    );

    const totalQty = items.reduce((s, i) => s + i.quantity, 0);
    const totalCost = items.reduce(
      (s, i) => s + i.quantity * i.buyPrice,
      0
    );

    onChange(items, valid, totalQty, totalCost);
  }, [items, onChange]);

  const updateItem = (index: number, field: keyof PurchaseItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-3 border p-3 rounded"
          >
            <Select
              value={item.medicineId ? String(item.medicineId) : ""}
              onValueChange={(v) =>
                updateItem(index, "medicineId", Number(v))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Medicine" />
              </SelectTrigger>
              <SelectContent>
                {medicines.map((m) => (
                  <SelectItem
                    key={m.medicineId}
                    value={String(m.medicineId)}
                  >
                    {m.medicineName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                updateItem(index, "quantity", Number(e.target.value))
              }
            />

            <Input
              type="number"
              placeholder="Buy Price"
              value={item.buyPrice}
              onChange={(e) =>
                updateItem(index, "buyPrice", Number(e.target.value))
              }
            />

            <Input
              type="date"
              value={item.manufactureDate}
              onChange={(e) =>
                updateItem(index, "manufactureDate", e.target.value)
              }
            />

            <Input
              type="date"
              value={item.expiryDate}
              onChange={(e) =>
                updateItem(index, "expiryDate", e.target.value)
              }
            />

            <Button
              variant="destructive"
              disabled={items.length === 1}
              onClick={() =>
                setItems(items.filter((_, i) => i !== index))
              }
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          onClick={() => setItems([...items, emptyItem])}
          className="w-full"
        >
          + Add Medicine
        </Button>
      </CardContent>
    </Card>
  );
};

export default PurchaseItemsSection;
