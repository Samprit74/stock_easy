import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createCustomer } from "@/services/customerApi";
import { useToast } from "@/components/ui/use-toast";

export type CustomerPayload = {
  customerId: number;
  name: string;
  phone: string;
  email: string;
};

type CustomerSectionProps = {
  onValidated: (customer: CustomerPayload | null) => void;
};

const CustomerSection = ({ onValidated }: CustomerSectionProps) => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [validatedCustomer, setValidatedCustomer] =
    useState<CustomerPayload | null>(null);

  const resetCustomer = () => {
    setName("");
    setPhone("");
    setEmail("");
    setValidatedCustomer(null);
    onValidated(null);
  };

  const handleValidateCustomer = async () => {
    if (!name || !phone) {
      toast({
        title: "Missing details",
        description: "Customer name and phone are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await createCustomer({
        name,
        phone,
        email,
      });

      setValidatedCustomer(response);
      onValidated(response);

      toast({
        title: "Customer validated",
        description: "Customer details saved successfully",
      });
    } catch {
      toast({
        title: "Validation failed",
        description: "Unable to validate customer",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Customer Details</CardTitle>

        {validatedCustomer && (
          <Button variant="outline" size="sm" onClick={resetCustomer}>
            Change
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!!validatedCustomer}
        />

        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!!validatedCustomer}
        />

        <Input
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!validatedCustomer}
        />

        {!validatedCustomer ? (
          <Button
            onClick={handleValidateCustomer}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Validating..." : "Validate Customer"}
          </Button>
        ) : (
          <div className="rounded-md bg-green-50 p-3 text-green-700 text-sm">
            Customer validated ✔
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerSection;
