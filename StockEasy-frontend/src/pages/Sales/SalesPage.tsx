import { useEffect, useState } from "react";
import { Receipt, RotateCcw, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getSales, getSaleById, returnSale } from "@/services";
import { getErrorMessage, isApiError } from "@/services";
import type { SaleResponse } from "@/types";

const PAGE_SIZE = 15;

const SalesPage = () => {
  const { toast } = useToast();
  const [sales, setSales] = useState<SaleResponse[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<SaleResponse | null>(null);
  const [returning, setReturning] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getSales(page, PAGE_SIZE);
      setSales(res.items);
      setTotalPages(res.totalPages);
    } catch (e) {
      toast({ title: "Failed to load sales", description: getErrorMessage(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  const openSale = async (id: number) => {
    try {
      const full = await getSaleById(id);
      setSelected(full);
    } catch (e) {
      toast({ title: "Failed to load sale", description: getErrorMessage(e), variant: "destructive" });
    }
  };

  const handleReturn = async (id: number) => {
    if (!confirm("Return this sale? Stock will be restocked.")) return;
    setReturning(id);
    try {
      await returnSale(id);
      toast({ title: "Sale returned", description: `Bill #${id} restocked.` });
      setSelected(null);
      load();
    } catch (e) {
      const msg = isApiError(e) && e.message.toLowerCase().includes("already")
        ? "Already returned."
        : getErrorMessage(e);
      toast({ title: "Return failed", description: msg, variant: "destructive" });
    } finally {
      setReturning(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Receipt className="w-7 h-7" /> All Sales
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Sales History</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : sales.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sales found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">Bill #</th>
                      <th className="p-2 text-left">Customer</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-right">Total</th>
                      <th className="p-2 text-right">Status</th>
                      <th className="p-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((s) => (
                      <tr key={s.saleId} className="border-t hover:bg-gray-50">
                        <td className="p-2 font-mono">#{s.saleId}</td>
                        <td className="p-2">
                          {s.customerName || "Walk-in"}
                          {s.customerPhone && (
                            <span className="text-xs text-muted-foreground ml-1">({s.customerPhone})</span>
                          )}
                        </td>
                        <td className="p-2">{s.saleDate}</td>
                        <td className="p-2 text-right font-semibold">₹{s.totalAmount.toFixed(2)}</td>
                        <td className="p-2 text-right">
                          {s.returned ? (
                            <Badge className="bg-red-100 text-red-700">Returned</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">Completed</Badge>
                          )}
                        </td>
                        <td className="p-2 text-right space-x-1">
                          <Button size="sm" variant="outline" onClick={() => openSale(s.saleId)}>
                            View
                          </Button>
                          {!s.returned && (
                            <Button
                              size="sm"
                              variant="destructive"
                              disabled={returning === s.saleId}
                              onClick={() => handleReturn(s.saleId)}
                            >
                              <RotateCcw className="w-3 h-3" />
                            </Button>
                          )}
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
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Bill #{selected.saleId}</h2>
                <p className="text-sm text-muted-foreground">{selected.saleDate}</p>
              </div>
              <button onClick={() => setSelected(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium">{selected.customerName || "Walk-in"}</p>
                  {selected.customerPhone && <p className="text-xs">{selected.customerPhone}</p>}
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Status</p>
                  {selected.returned ? (
                    <Badge className="bg-red-100 text-red-700">Returned</Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-700">Completed</Badge>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Line Items</h3>
                {selected.items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No items.</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-2">Medicine</th>
                        <th className="text-right p-2">Qty</th>
                        <th className="text-right p-2">Price</th>
                        <th className="text-right p-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.items.map((it, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-2">{it.medicineName}</td>
                          <td className="p-2 text-right">{it.quantity}</td>
                          <td className="p-2 text-right">₹{it.sellPrice.toFixed(2)}</td>
                          <td className="p-2 text-right font-medium">₹{(it.quantity * it.sellPrice).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 font-bold">
                        <td colSpan={3} className="p-2 text-right">Total</td>
                        <td className="p-2 text-right text-green-600">₹{selected.totalAmount.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
              {!selected.returned && (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => handleReturn(selected.saleId)}
                  disabled={returning === selected.saleId}
                >
                  {returning === selected.saleId ? "Returning..." : "Return this sale"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
