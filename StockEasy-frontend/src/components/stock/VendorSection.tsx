import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSupplier } from "@/services/supplierApi";
import { useToast } from "@/components/ui/use-toast";

export type SupplierPayload = {
  supplierId: number;
  name: string;
  phone: string;
  email: string;
};

type VendorSectionProps = {
  onValidated: (supplier: SupplierPayload | null) => void;
};

const VendorSection = ({ onValidated }: VendorSectionProps) => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [validatedSupplier, setValidatedSupplier] =
    useState<SupplierPayload | null>(null);

  const resetVendor = () => {
    setName("");
    setPhone("");
    setEmail("");
    setValidatedSupplier(null);
    onValidated(null);
  };

  const handleValidateVendor = async () => {
    if (!name || !phone) {
      toast({
        title: "Missing details",
        description: "Vendor name and phone are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await createSupplier({
        name,
        phone,
        email,
      });

      setValidatedSupplier(response);
      onValidated(response);

      toast({
        title: "Vendor validated",
        description: "Vendor details saved successfully",
      });
    } catch {
      toast({
        title: "Validation failed",
        description: "Unable to validate vendor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vendor Details</CardTitle>

        {validatedSupplier && (
          <Button variant="outline" size="sm" onClick={resetVendor}>
            Change
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Vendor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!!validatedSupplier}
        />

        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!!validatedSupplier}
        />

        <Input
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!validatedSupplier}
        />

        {!validatedSupplier ? (
          <Button
            onClick={handleValidateVendor}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Validating..." : "Validate Vendor"}
          </Button>
        ) : (
          <div className="rounded-md bg-green-50 p-3 text-green-700 text-sm">
            Vendor validated ✔
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorSection;
