// components/dashboard/ExpiringList.tsx

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  getExpiringStock,
  BatchItem,
} from "@/services/batchItemApi";

const ExpiringList = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getExpiringStock(30);
        setItems(data);
      } catch {
        toast({
          title: "Failed to load expiring medicines",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expiring Medicines</CardTitle>
      </CardHeader>

      <CardContent>
        {loading && (
          <div className="text-sm text-muted-foreground">
            Loading...
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No medicines expiring soon 🎉
          </div>
        )}

        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li
              key={item.batchItemId}
              className="flex justify-between border-b pb-1"
            >
              <span>{item.medicine.medicineName}</span>
              <span className="text-red-600">
                Exp: {item.expiryDate} | Qty: {item.quantityAvailable}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ExpiringList;
