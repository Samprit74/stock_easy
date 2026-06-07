import { useEffect, useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { getMyBills, returnSale } from "@/services";
import { getErrorMessage, isApiError } from "@/services";
import type { SaleResponse } from "@/types";

const PAGE_SIZE = 10;

const SalesHistoryContainer = () => {
  const { toast } = useToast();
  const [sales, setSales] = useState<SaleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selected, setSelected] = useState<SaleResponse | null>(null);
  const [returning, setReturning] = useState<number | null>(null);

  const load = async (p: number) => {
    setLoading(true);
    try {
      const res = await getMyBills(p, PAGE_SIZE);
      setSales(res.items);
      setTotalPages(res.totalPages);
    } catch (e) {
      toast({
        title: "Failed to load bills",
        description: getErrorMessage(e),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const totalRevenue = useMemo(
    () => sales.reduce((sum, s) => sum + s.totalAmount, 0),
    [sales]
  );

  const handleReturn = async (saleId: number) => {
    if (!confirm("Return this bill? Stock will be restocked and the sale marked as returned.")) return;
    setReturning(saleId);
    try {
      await returnSale(saleId);
      toast({ title: "Sale returned", description: `Bill #${saleId} has been returned and stock restocked.` });
      load(page);
    } catch (e) {
      const msg = isApiError(e) && e.status === 400 && e.message.includes("already")
        ? "This sale has already been returned."
        : getErrorMessage(e);
      toast({ title: "Return failed", description: msg, variant: "destructive" });
    } finally {
      setReturning(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Sales Records</h2>
        <span className="text-green-600 font-semibold">
          Page revenue: ₹{totalRevenue.toFixed(2)}
        </span>
      </div>

      {loading ? (
        <div className="p-8 text-center text-muted-foreground">Loading...</div>
      ) : sales.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No bills found. Start a sale to see your records here.
        </div>
      ) : (
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Bill #</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-right">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale.saleId}
                className={`border-t cursor-pointer hover:bg-gray-50 ${sale.returned ? "opacity-60" : ""}`}
                onClick={() => setSelected(sale)}
              >
                <td className="p-3 font-mono">#{sale.saleId}</td>
                <td className="p-3 font-medium">
                  {sale.customerName || "Walk-in"}
                  {sale.customerPhone && (
                    <div className="text-xs text-muted-foreground">{sale.customerPhone}</div>
                  )}
                </td>
                <td className="p-3">{sale.saleDate}</td>
                <td className="p-3 text-muted-foreground">
                  {sale.items?.length ?? 0} item(s)
                </td>
                <td className="p-3 text-right font-semibold text-green-600">
                  ₹{sale.totalAmount.toFixed(2)}
                </td>
                <td className="p-3 text-right">
                  {sale.returned ? (
                    <span className="inline-block px-2 py-0.5 rounded text-xs bg-red-100 text-red-700">Returned</span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded text-xs bg-green-100 text-green-700">Completed</span>
                  )}
                </td>
                <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                  {!sale.returned && (
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={returning === sale.saleId}
                      onClick={() => handleReturn(sale.saleId)}
                    >
                      {returning === sale.saleId ? "..." : "Return"}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="p-4 flex justify-between items-center border-t">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0 || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1 || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {selected && <SaleDetailModal sale={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

function SaleDetailModal({ sale, onClose }: { sale: SaleResponse; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Bill #{sale.saleId}</h2>
            <p className="text-sm text-muted-foreground">{sale.saleDate}</p>
          </div>
          <button onClick={onClose} className="text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-muted-foreground">Customer</p>
              <p className="font-medium">{sale.customerName || "Walk-in"}</p>
              {sale.customerPhone && <p className="text-xs">{sale.customerPhone}</p>}
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Status</p>
              {sale.returned ? (
                <span className="inline-block px-2 py-0.5 rounded text-xs bg-red-100 text-red-700">Returned</span>
              ) : (
                <span className="inline-block px-2 py-0.5 rounded text-xs bg-green-100 text-green-700">Completed</span>
              )}
            </div>
          </div>
          <h3 className="font-semibold mb-2">Line Items</h3>
          {sale.items && sale.items.length > 0 ? (
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
                {sale.items.map((it, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{it.medicineName || "?"}</td>
                    <td className="p-2 text-right">{it.quantity}</td>
                    <td className="p-2 text-right">₹{it.sellPrice.toFixed(2)}</td>
                    <td className="p-2 text-right font-medium">
                      ₹{(it.quantity * it.sellPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 font-bold">
                  <td colSpan={3} className="p-2 text-right">Total</td>
                  <td className="p-2 text-right text-green-600">₹{sale.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p className="text-muted-foreground text-sm">No line items.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesHistoryContainer;
