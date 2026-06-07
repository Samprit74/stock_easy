import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import {
  getCustomers,
  deleteCustomer,
  searchCustomers,
  getSalesByCustomer,
} from "@/services";
import { getErrorMessage, isApiError } from "@/services";
import type { Customer, Page, SaleResponse } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const EMPTY_PAGE: Page<Customer> = {
  items: [],
  currentPage: 0,
  totalPages: 0,
  totalItems: 0,
};

const CustomersContainer = () => {
  const { toast } = useToast();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<Page<Customer>>(EMPTY_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Customer[] | null>(null);

  const [historyCustomer, setHistoryCustomer] = useState<Customer | null>(null);
  const [historySales, setHistorySales] = useState<SaleResponse[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomers(page, 5);
      setPageData(res);
    } catch (e) {
      toast({
        title: "Failed to load customers",
        description: getErrorMessage(e),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchResults !== null) return;
    loadCustomers();
  }, [page, searchResults]);

  const runSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      return;
    }
    try {
      setLoading(true);
      const res = await searchCustomers(searchTerm.trim());
      setSearchResults(res);
    } catch (e) {
      toast({
        title: "Search failed",
        description: getErrorMessage(e),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults(null);
  };

  const handleSuccess = () => {
    setSelectedCustomer(null);
    if (searchResults !== null) {
      runSearch();
    } else {
      loadCustomers();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this customer? This cannot be undone.")) return;
    try {
      await deleteCustomer(id);
      toast({ title: "Customer deleted" });
      handleSuccess();
    } catch (e) {
      const msg = isApiError(e) && e.status === 403
        ? "Only ADMIN can delete customers."
        : getErrorMessage(e);
      toast({ title: "Delete failed", description: msg, variant: "destructive" });
    }
  };

  const displayedItems = searchResults ?? pageData.items;
  const totalPages = searchResults ? 1 : pageData.totalPages;
  const currentPage = searchResults ? 0 : pageData.currentPage;

  const openHistory = async (c: Customer) => {
    setHistoryCustomer(c);
    setHistorySales([]);
    setHistoryLoading(true);
    try {
      const res = await getSalesByCustomer(c.customerId, 0, 20);
      setHistorySales(res.items);
    } catch (e) {
      toast({ title: "Failed to load purchase history", description: getErrorMessage(e), variant: "destructive" });
    } finally {
      setHistoryLoading(false);
    }
  };

  const closeHistory = () => {
    setHistoryCustomer(null);
    setHistorySales([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CustomerForm
        selectedCustomer={selectedCustomer}
        onSuccess={handleSuccess}
        onCancelEdit={() => setSelectedCustomer(null)}
      />

      <div className="md:col-span-2 space-y-4">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            runSearch();
          }}
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers by name..."
              className="pl-9 pr-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={clearSearch}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            Search
          </Button>
        </form>

        {searchResults !== null && (
          <p className="text-sm text-muted-foreground">
            Showing {searchResults.length} search result(s) for "{searchTerm}".
          </p>
        )}

        <CustomerList
          data={{
            items: displayedItems,
            currentPage,
            totalPages,
            totalItems: searchResults?.length ?? pageData.totalItems,
          }}
          loading={loading}
          onEdit={setSelectedCustomer}
          onDelete={handleDelete}
          onViewHistory={openHistory}
          onNext={() => setPage((p) => p + 1)}
          onPrev={() => setPage((p) => Math.max(p - 1, 0))}
        />
      </div>

      {historyCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeHistory}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{historyCustomer.name} — Purchase History</h2>
                <p className="text-sm text-muted-foreground">{historyCustomer.phone}</p>
              </div>
              <button onClick={closeHistory}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {historyLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : historySales.length === 0 ? (
                <p className="text-sm text-muted-foreground">No purchases yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2">Bill #</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-right p-2">Total</th>
                      <th className="text-right p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historySales.map((s) => (
                      <tr key={s.saleId} className="border-t">
                        <td className="p-2 font-mono">#{s.saleId}</td>
                        <td className="p-2">{s.saleDate}</td>
                        <td className="p-2 text-right font-medium">₹{s.totalAmount.toFixed(2)}</td>
                        <td className="p-2 text-right">
                          {s.returned ? (
                            <span className="text-red-600 text-xs">Returned</span>
                          ) : (
                            <span className="text-green-600 text-xs">Completed</span>
                          )}
                        </td>
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

export default CustomersContainer;
