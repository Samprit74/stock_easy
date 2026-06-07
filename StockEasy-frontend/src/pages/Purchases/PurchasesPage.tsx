import { useEffect, useState } from "react";
import { Truck, Calendar, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  getPurchases,
  getPurchaseById,
  getPurchasesByDate,
  getPurchasesBySupplier,
  getSuppliers,
} from "@/services";
import { getErrorMessage, isApiError } from "@/services";
import type { PurchaseResponse, Supplier } from "@/types";

const PAGE_SIZE = 15;

const PurchasesPage = () => {
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<PurchaseResponse[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [supplierId, setSupplierId] = useState<number | "">("");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [selected, setSelected] = useState<PurchaseResponse | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getSuppliers(0, 100);
        setSuppliers(res.items);
      } catch (e) {
        toast({ title: "Failed to load suppliers", description: getErrorMessage(e), variant: "destructive" });
      }
    })();
  }, [toast]);

  const load = async () => {
    setLoading(true);
    try {
      let res;
      if (supplierId !== "") {
        res = await getPurchasesBySupplier(supplierId, page, PAGE_SIZE);
      } else if (start && end) {
        res = await getPurchasesByDate(start, end, page, PAGE_SIZE);
      } else {
        res = await getPurchases(page, PAGE_SIZE);
      }
      setPurchases(res.items);
      setTotalPages(res.totalPages);
    } catch (e) {
      toast({ title: "Failed to load purchases", description: getErrorMessage(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, supplierId]);

  const openDetail = async (id: number) => {
    setLoadingDetail(true);
    try {
      const detail = await getPurchaseById(id);
      setSelected(detail);
    } catch (e) {
      toast({ title: "Failed to load purchase", description: getErrorMessage(e), variant: "destructive" });
    } finally {
      setLoadingDetail(false);
    }
  };

  const clearFilters = () => {
    setStart("");
    setEnd("");
    setSupplierId("");
    setPage(0);
    load();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Truck className="w-7 h-7" /> Purchase History
        </h1>

        <Card className="mb-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <label className="text-xs text-muted-foreground">From</label>
                <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">To</label>
                <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Supplier</label>
                <select
                  className="border rounded px-2 py-1 text-sm h-9 w-48"
                  value={supplierId}
                  onChange={(e) => {
                    setPage(0);
                    setSupplierId(e.target.value ? Number(e.target.value) : "");
                  }}
                >
                  <option value="">All suppliers</option>
                  {suppliers.map((s) => (
                    <option key={s.supplierId} value={s.supplierId}>{s.name}</option>
                  ))}
                </select>
              </div>
              <Button onClick={() => { setPage(0); load(); }}>Apply</Button>
              <Button variant="outline" onClick={clearFilters}>Clear</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : purchases.length === 0 ? (
              <p className="text-sm text-muted-foreground">No purchases found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">Batch #</th>
                      <th className="p-2 text-left">Invoice</th>
                      <th className="p-2 text-left">Supplier</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-right">Items</th>
                      <th className="p-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((p) => (
                      <tr key={p.batchId} className="border-t hover:bg-gray-50">
                        <td className="p-2 font-mono">{p.batchNumber ?? `#${p.batchId}`}</td>
                        <td className="p-2 font-mono text-xs">{p.invoiceNo}</td>
                        <td className="p-2">{p.supplierName ?? "—"}</td>
                        <td className="p-2">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {p.purchaseDate}
                          </span>
                        </td>
                        <td className="p-2 text-right">{p.items?.length ?? 0}</td>
                        <td className="p-2 text-right">
                          <Button size="sm" variant="outline" onClick={() => openDetail(p.batchId)} disabled={loadingDetail}>
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" size="sm" disabled={page === 0 || loading} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">Page {page + 1} of {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page >= totalPages - 1 || loading} onClick={() => setPage((p) => p + 1)}>
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Purchase #{selected.batchNumber ?? selected.batchId}</h2>
                <p className="text-sm text-muted-foreground">
                  Invoice {selected.invoiceNo} · {selected.purchaseDate} · {selected.supplierName}
                </p>
              </div>
              <button onClick={() => setSelected(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {selected.items.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2">Medicine</th>
                      <th className="text-right p-2">Qty</th>
                      <th className="text-right p-2">Buy Price</th>
                      <th className="text-right p-2">Mfg</th>
                      <th className="text-right p-2">Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.items.map((it) => (
                      <tr key={it.batchItemId} className="border-t">
                        <td className="p-2">{it.medicineName ?? "?"}</td>
                        <td className="p-2 text-right">{it.quantity}</td>
                        <td className="p-2 text-right">₹{it.buyPrice.toFixed(2)}</td>
                        <td className="p-2 text-right text-xs">{it.manufactureDate ?? "—"}</td>
                        <td className="p-2 text-right text-xs">{it.expiryDate ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasesPage;
