// components/suppliers/SuppliersContainer.tsx

import { useEffect, useState } from "react";
import SupplierForm from "./SupplierForm";
import SupplierList from "./SupplierList";
import {
  Supplier,
  getSuppliers,
  deleteSupplier,
  PaginatedSuppliers,
} from "@/services/supplierApi";
import { useToast } from "@/components/ui/use-toast";

const SuppliersContainer = () => {
  const { toast } = useToast();

  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<PaginatedSuppliers>({
    items: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  });

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const res = await getSuppliers(page, 5);
      setData(res);
    } catch {
      toast({
        title: "Failed to load suppliers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, [page]);

  const handleSuccess = () => {
    setSelectedSupplier(null);
    loadSuppliers();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSupplier(id);
      toast({ title: "Supplier deleted" });
      loadSuppliers();
    } catch {
      toast({
        title: "Delete failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Form */}
      <SupplierForm
        selectedSupplier={selectedSupplier}
        onSuccess={handleSuccess}
        onCancelEdit={() => setSelectedSupplier(null)}
      />

      {/* List */}
      <div className="md:col-span-2">
        <SupplierList
          data={data}
          loading={loading}
          onEdit={setSelectedSupplier}
          onDelete={handleDelete}
          onNext={() => setPage((p) => p + 1)}
          onPrev={() => setPage((p) => Math.max(p - 1, 0))}
        />
      </div>
    </div>
  );
};

export default SuppliersContainer;
