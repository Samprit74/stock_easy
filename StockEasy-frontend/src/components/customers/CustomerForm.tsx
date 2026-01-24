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
  createCustomer,
  updateCustomer,
  Customer,
} from "@/services/customerApi";

type CustomerFormProps = {
  selectedCustomer: Customer | null;
  onSuccess: () => void;
  onCancelEdit: () => void;
};

const CustomerForm = ({
  selectedCustomer,
  onSuccess,
  onCancelEdit,
}: CustomerFormProps) => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setPhone(selectedCustomer.phone);
      setEmail(selectedCustomer.email || "");
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCustomer]);

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

      if (selectedCustomer) {
        await updateCustomer(selectedCustomer.customerId, {
          name,
          phone,
          email,
        });

        toast({ title: "Customer updated" });
      } else {
        await createCustomer({
          name,
          phone,
          email,
        });

        toast({ title: "Customer added" });
      }

      resetForm();
      onSuccess();
    } catch {
      toast({
        title: "Operation failed",
        description: "Unable to save customer",
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
          {selectedCustomer ? "Edit Customer" : "Add Customer"}
        </CardTitle>

        {selectedCustomer && (
          <Button variant="outline" size="sm" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Customer Name"
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
            : selectedCustomer
            ? "Update Customer"
            : "Add Customer"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
