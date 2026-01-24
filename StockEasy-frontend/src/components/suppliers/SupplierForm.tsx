import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  createSupplier,
  updateSupplier,
  Supplier,
} from "@/services/supplierApi";

type SupplierFormProps = {
  selectedSupplier: Supplier | null;
  onSuccess: () => void;
  onCancelEdit: () => void;
};

const SupplierForm = ({
  selectedSupplier,
  onSuccess,
  onCancelEdit,
}: SupplierFormProps) => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedSupplier) {
      setName(selectedSupplier.name);
      setPhone(selectedSupplier.phone);
      setEmail(selectedSupplier.email || "");
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSupplier]);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
  };

  const handleSubmit = async () => {
    if (!name || !phone) {
      toast({
        title: "Missing fields",
        description: "Name and phone are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      if (selectedSupplier) {
        await updateSupplier(selectedSupplier.supplierId, {
          name,
          phone,
          email,
        });

        toast({ title: "Supplier updated" });
      } else {
        await createSupplier({
          name,
          phone,
          email,
        });

        toast({ title: "Supplier added" });
      }

      resetForm();
      onSuccess();
    } catch {
      toast({
        title: "Operation failed",
        description: "Unable to save supplier",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {selectedSupplier ? "Edit Supplier" : "Add Supplier"}
        </CardTitle>

        {selectedSupplier && (
          <Button variant="outline" size="sm" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Supplier Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : selectedSupplier
            ? "Update Supplier"
            : "Add Supplier"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SupplierForm;
