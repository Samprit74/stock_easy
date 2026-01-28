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

type Props = {
  onValidated: (supplier: SupplierPayload | null) => void;
};

const VendorSection = ({ onValidated }: Props) => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] =
    useState<SupplierPayload | null>(null);

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setValidated(null);
    onValidated(null);
  };

  const handleValidate = async () => {
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
      const res = await createSupplier({ name, phone, email });
      setValidated(res);
      onValidated(res);
      toast({ title: "Vendor validated" });
    } catch {
      toast({
        title: "Validation failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Vendor Details</CardTitle>
        {validated && (
          <Button size="sm" variant="outline" onClick={reset}>
            Change
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Vendor Name"
          value={name}
          disabled={!!validated}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Phone"
          value={phone}
          disabled={!!validated}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          placeholder="Email (optional)"
          value={email}
          disabled={!!validated}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!validated ? (
          <Button
            className="w-full"
            onClick={handleValidate}
            disabled={loading}
          >
            {loading ? "Validating..." : "Validate Vendor"}
          </Button>
        ) : (
          <div className="rounded bg-green-50 p-2 text-sm text-green-700">
            Vendor validated ✔
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorSection;
