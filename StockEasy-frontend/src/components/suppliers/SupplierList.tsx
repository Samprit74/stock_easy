import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import SupplierCard from "./SupplierCard";
import {
  getSuppliers,
  deleteSupplier,
  Supplier,
} from "@/services/supplierApi";

type SupplierListProps = {
  onEdit: (supplier: Supplier) => void;
};

const SupplierList = ({ onEdit }: SupplierListProps) => {
  const { toast } = useToast();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await getSuppliers();
      setSuppliers(data);
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
    fetchSuppliers();
  }, []);

  const handleDelete = async (supplierId: number) => {
    try {
      await deleteSupplier(supplierId);
      toast({ title: "Supplier deleted" });
      fetchSuppliers();
    } catch {
      toast({
        title: "Delete failed",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No suppliers found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {suppliers.map((supplier) => (
        <SupplierCard
          key={supplier.supplierId}
          supplier={supplier}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default SupplierList;
