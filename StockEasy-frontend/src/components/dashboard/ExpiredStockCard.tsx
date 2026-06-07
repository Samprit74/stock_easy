import { useEffect, useState } from "react";
import { Skull } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getExpiredStockReport } from "@/services";
import { getErrorMessage } from "@/services";
import type { ExpiredStockReport } from "@/types";

const ExpiredStockCard = () => {
  const { toast } = useToast();
  const [report, setReport] = useState<ExpiredStockReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getExpiredStockReport();
        if (!cancelled) setReport(data);
      } catch (e) {
        if (!cancelled) {
          toast({
            title: "Failed to load expired-stock report",
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
  }, [toast]);

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Skull className="w-5 h-5 text-red-500" /> Expired Stock Script
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!report || report.totalExpiredBatches === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Skull className="w-5 h-5 text-red-500" /> Expired Stock Script
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-600">No expired stock. Everything is fresh.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Skull className="w-5 h-5 text-red-500" /> Expired Stock Script
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 mb-3 text-center">
          <div className="bg-red-50 rounded p-2">
            <p className="text-xs text-muted-foreground">Batches</p>
            <p className="text-lg font-bold text-red-600">{report.totalExpiredBatches}</p>
          </div>
          <div className="bg-red-50 rounded p-2">
            <p className="text-xs text-muted-foreground">Units</p>
            <p className="text-lg font-bold text-red-600">{report.totalExpiredUnits}</p>
          </div>
          <div className="bg-red-50 rounded p-2">
            <p className="text-xs text-muted-foreground">Loss (₹)</p>
            <p className="text-lg font-bold text-red-600">{report.totalLoss.toFixed(2)}</p>
          </div>
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
            Show {report.items.length} batch details
          </summary>
          <ul className="mt-2 divide-y max-h-48 overflow-y-auto">
            {report.items.map((it, i) => (
              <li key={i} className="py-1 text-xs">
                <span className="font-medium">{it.medicineName}</span> ({it.batchNumber ?? "—"})
                <span className="text-muted-foreground"> · exp {it.expiryDate} · </span>
                <span className="text-red-600">{it.quantityExpired} units</span>
                <span className="text-muted-foreground"> · loss ₹{it.totalLoss.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </details>
      </CardContent>
    </Card>
  );
};

export default ExpiredStockCard;
