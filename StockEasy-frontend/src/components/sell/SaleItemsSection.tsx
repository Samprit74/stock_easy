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

export type SaleItem = {
  medicineId: number;
  quantity: number;
  sellPrice: number;
};

type Medicine = {
  medicineId: number;
  medicineName: string;
};

type SaleItemsSectionProps = {
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

const SaleItemsSection = ({ onChange }: SaleItemsSectionProps) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [items, setItems] = useState<SaleItem[]>([emptyItem]);

  useEffect(() => {
    getMedicines().then(setMedicines);
  }, []);

  useEffect(() => {
    const valid = items.every(
      (i) => i.medicineId > 0 && i.quantity > 0 && i.sellPrice > 0
    );

    const totalQty = items.reduce((s, i) => s + i.quantity, 0);
    const totalAmount = items.reduce(
      (s, i) => s + i.quantity * i.sellPrice,
      0
    );

    onChange(items, valid, totalQty, totalAmount);
  }, [items, onChange]);

  const updateItem = (index: number, field: keyof SaleItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sale Items</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-3 border p-3 rounded"
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
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                updateItem(index, "quantity", Number(e.target.value))
              }
            />

            <Input
              type="number"
              placeholder="Sell Price"
              value={item.sellPrice}
              onChange={(e) =>
                updateItem(index, "sellPrice", Number(e.target.value))
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
          className="w-full"
          onClick={() => setItems([...items, emptyItem])}
        >
          + Add Item
        </Button>
      </CardContent>
    </Card>
  );
};

export default SaleItemsSection;
