import { useState } from "react";
import { Star, Phone, Mail, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createCustomer, getCustomerByPhone } from "@/services";
import { getErrorMessage, isApiError, isNetworkError } from "@/services";
import { useToast } from "@/components/ui/use-toast";
import type { Customer } from "@/types";

export type CustomerPayload = {
  customerId: number;
  name: string;
  phone: string;
  email: string;
  regular: boolean;
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
  const [fetchedCustomer, setFetchedCustomer] = useState<Customer | null>(null);

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setValidatedCustomer(null);
    setFetchedCustomer(null);
    onValidated(null);
  };

  const handlePhoneLookup = async () => {
    if (!phone) {
      toast({ title: "Phone required", description: "Enter a phone to look up", variant: "destructive" });
      return;
    }
    try {
      setLoading(true);
      const existing = await getCustomerByPhone(phone);
      setFetchedCustomer(existing);
      setName(existing.name);
      setEmail(existing.email ?? "");
      toast({
        title: existing.regular ? "Regular customer found" : "Customer found",
        description: `${existing.name} (${existing.totalOrders} orders)`,
      });
    } catch (e) {
      if (isApiError(e) && e.status === 404) {
        setFetchedCustomer(null);
        toast({
          title: "New customer",
          description: "Phone not on file. Fill in details and validate to create.",
        });
      } else if (isNetworkError(e)) {
        toast({ title: "Network error", description: e.message, variant: "destructive" });
      } else {
        toast({ title: "Lookup failed", description: getErrorMessage(e), variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
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
      const response = await createCustomer({ name, phone, email });
      const payload: CustomerPayload = {
        customerId: response.customerId,
        name: response.name,
        phone: response.phone,
        email: response.email,
        regular: response.regular,
      };
      setValidatedCustomer(payload);
      onValidated(payload);
      toast({
        title: "Customer validated",
        description: response.regular
          ? "⭐ Regular customer — will receive freshest batch"
          : "Customer saved",
      });
    } catch (e) {
      toast({
        title: "Validation failed",
        description: getErrorMessage(e),
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
          <Button variant="outline" size="sm" onClick={reset}>
            Change
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {fetchedCustomer && (
          <div className="rounded-md bg-blue-50 p-3 text-sm flex items-start gap-2">
            {fetchedCustomer.regular ? (
              <Badge className="bg-amber-500 hover:bg-amber-600 gap-1 shrink-0">
                <Star className="w-3 h-3" /> Regular
              </Badge>
            ) : (
              <Badge variant="secondary" className="shrink-0">
                <UserPlus className="w-3 h-3 mr-1" /> Returning
              </Badge>
            )}
            <div>
              <p className="font-medium">{fetchedCustomer.name}</p>
              <p className="text-xs text-muted-foreground">
                {fetchedCustomer.totalOrders} order(s) so far
                {fetchedCustomer.regular && " — will get freshest batch"}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Phone"
              className="pl-9"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!!validatedCustomer}
            />
          </div>
          <Button
            variant="outline"
            onClick={handlePhoneLookup}
            disabled={loading || !phone || !!validatedCustomer}
          >
            {loading ? "..." : "Lookup"}
          </Button>
        </div>

        <div className="relative">
          <Input
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!!validatedCustomer}
          />
        </div>

        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Email (optional)"
            className="pl-9"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!validatedCustomer}
          />
        </div>

        {!validatedCustomer ? (
          <Button onClick={handleValidate} disabled={loading} className="w-full">
            {loading ? "Validating..." : fetchedCustomer ? "Confirm Customer" : "Create Customer"}
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
