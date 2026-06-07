import { useEffect, useState } from "react";
import { Skull, Boxes, Package, Tag, Calculator } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  getExpiredStock,
  getBatchesByMedicine,
  getBatchesByBatch,
  getMedicines,
  previewDiscount,
} from "@/services";
import { getErrorMessage } from "@/services";
import type { BatchItem, Medicine, DiscountInfo } from "@/types";

const StockToolsPage = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState("expired");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Boxes className="w-7 h-7" /> Stock Tools
        </h1>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="expired"><Skull className="w-4 h-4 mr-1" /> Expired</TabsTrigger>
            <TabsTrigger value="by-medicine"><Package className="w-4 h-4 mr-1" /> By Medicine</TabsTrigger>
            <TabsTrigger value="by-batch"><Tag className="w-4 h-4 mr-1" /> By Batch</TabsTrigger>
            <TabsTrigger value="discount"><Calculator className="w-4 h-4 mr-1" /> Discount</TabsTrigger>
          </TabsList>

          <TabsContent value="expired">
            <ExpiredList onError={(m) => toast({ title: "Error", description: m, variant: "destructive" })} />
          </TabsContent>
          <TabsContent value="by-medicine">
            <ByMedicine onError={(m) => toast({ title: "Error", description: m, variant: "destructive" })} />
          </TabsContent>
          <TabsContent value="by-batch">
            <ByBatch onError={(m) => toast({ title: "Error", description: m, variant: "destructive" })} />
          </TabsContent>
          <TabsContent value="discount">
            <DiscountPreview onError={(m) => toast({ title: "Error", description: m, variant: "destructive" })} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

function ExpiredList({ onError }: { onError: (msg: string) => void }) {
  const [items, setItems] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getExpiredStock();
        setItems(data);
      } catch (e) {
        onError(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [onError]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All expired batches (raw list)</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-green-600">No expired stock.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2">Batch #</th>
                <th className="text-left p-2">Medicine</th>
                <th className="text-right p-2">Qty</th>
                <th className="text-right p-2">Buy ₹</th>
                <th className="text-right p-2">Expiry</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.batchItemId} className="border-t">
                  <td className="p-2 font-mono text-xs">{b.batchNumber ?? "—"}</td>
                  <td className="p-2">{b.medicineName ?? "?"}</td>
                  <td className="p-2 text-right">{b.quantityAvailable}</td>
                  <td className="p-2 text-right">{b.buyPrice.toFixed(2)}</td>
                  <td className="p-2 text-right text-red-600">{b.expiryDate ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}

function ByMedicine({ onError }: { onError: (msg: string) => void }) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [medicineId, setMedicineId] = useState<number | "">("");
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMedicines(0, 200);
        setMedicines(res.items);
      } catch (e) {
        onError(getErrorMessage(e));
      }
    })();
  }, [onError]);

  const load = async () => {
    if (!medicineId) return;
    setLoading(true);
    try {
      const list = await getBatchesByMedicine(Number(medicineId));
      setBatches(list);
    } catch (e) {
      onError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All batches for a medicine</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <select
            className="border rounded px-2 py-1 text-sm h-9 flex-1"
            value={medicineId}
            onChange={(e) => setMedicineId(e.target.value ? Number(e.target.value) : "")}
          >
            <option value="">Select a medicine...</option>
            {medicines.map((m) => (
              <option key={m.medicineId} value={m.medicineId}>{m.medicineName}</option>
            ))}
          </select>
          <Button onClick={load} disabled={!medicineId || loading}>Load batches</Button>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : batches.length > 0 ? (
          <BatchTable batches={batches} />
        ) : (
          <p className="text-sm text-muted-foreground">No batches to show.</p>
        )}
      </CardContent>
    </Card>
  );
}

function ByBatch({ onError }: { onError: (msg: string) => void }) {
  const [batchId, setBatchId] = useState("");
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const id = Number(batchId);
    if (!id) return;
    setLoading(true);
    try {
      const list = await getBatchesByBatch(id);
      setBatches(list);
    } catch (e) {
      onError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All items in a purchase batch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Batch ID (e.g. 1)"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
          />
          <Button onClick={load} disabled={!batchId || loading}>Load</Button>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : batches.length > 0 ? (
          <BatchTable batches={batches} />
        ) : (
          <p className="text-sm text-muted-foreground">No items to show.</p>
        )}
      </CardContent>
    </Card>
  );
}

function BatchTable({ batches }: { batches: BatchItem[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left p-2">Medicine</th>
          <th className="text-right p-2">Qty</th>
          <th className="text-right p-2">Buy ₹</th>
          <th className="text-right p-2">Mfg</th>
          <th className="text-right p-2">Expiry</th>
        </tr>
      </thead>
      <tbody>
        {batches.map((b) => (
          <tr key={b.batchItemId} className="border-t">
            <td className="p-2">{b.medicineName}</td>
            <td className="p-2 text-right">{b.quantityAvailable}</td>
            <td className="p-2 text-right">{b.buyPrice.toFixed(2)}</td>
            <td className="p-2 text-right text-xs">{b.manufactureDate ?? "—"}</td>
            <td className="p-2 text-right text-xs">{b.expiryDate ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DiscountPreview({ onError }: { onError: (msg: string) => void }) {
  const [batchItemId, setBatchItemId] = useState("");
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState<DiscountInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    const id = Number(batchItemId);
    const p = Number(price);
    if (!id || !p) return;
    setLoading(true);
    try {
      const result = await previewDiscount(id, p);
      setInfo(result);
    } catch (e) {
      onError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discount preview for a specific batch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Use this to see what the cashier should charge for a particular batch
          (backend applies 20% off ≤7 days, 10% ≤15 days, 5% ≤30 days).
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Batch item ID"
            value={batchItemId}
            onChange={(e) => setBatchItemId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Original price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Button onClick={run} disabled={!batchItemId || !price || loading}>
          {loading ? "Calculating..." : "Preview"}
        </Button>

        {info && (
          <div className="rounded-md border p-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Days to expiry</p>
              <p className="text-lg font-bold">{info.daysUntilExpiry}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Discount</p>
              <p className="text-lg font-bold text-green-600">{info.discountPercent}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Original</p>
              <p className="text-lg font-bold">₹{info.originalPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Final price</p>
              <p className="text-lg font-bold text-orange-600">₹{info.finalPrice.toFixed(2)}</p>
            </div>
            {info.discountPercent > 0 && (
              <Badge className="col-span-full bg-green-100 text-green-700 justify-center">
                Apply {info.discountPercent}% discount to this batch
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StockToolsPage;
