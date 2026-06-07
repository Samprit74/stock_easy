import { useEffect, useState } from "react";
import { AlertTriangle, PackageX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getLowStockMedicines } from "@/services";
import { getErrorMessage } from "@/services";
import type { LowStockMedicine } from "@/types";

const LowStockList = ({ threshold = 10 }: { threshold?: number }) => {
  const { toast } = useToast();
  const [items, setItems] = useState<LowStockMedicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getLowStockMedicines(threshold);
        if (!cancelled) setItems(data);
      } catch (e) {
        if (!cancelled) {
          toast({
            title: "Failed to load low-stock list",
            description: getErrorMessage(e),
            variant: "destructive",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [threshold, toast]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Low Stock — Rebuy Required
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-green-600 flex items-center gap-2">
            <PackageX className="w-4 h-4" /> All medicines are above the threshold.
          </p>
        ) : (
          <ul className="divide-y">
            {items.map((m) => (
              <li key={m.medicineId} className="py-2 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{m.medicineName}</p>
                  <p className="text-xs text-muted-foreground">{m.brand} — {m.category}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`font-mono font-semibold ${
                      m.totalAvailable === 0 ? "text-red-600" : "text-amber-600"
                    }`}
                  >
                    {m.totalAvailable}
                  </span>
                  <span className="text-xs text-muted-foreground"> / {m.threshold}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default LowStockList;
