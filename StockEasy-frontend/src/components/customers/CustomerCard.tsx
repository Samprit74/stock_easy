import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Mail, ShoppingBag, History } from "lucide-react";
import type { Customer } from "@/types";

type CustomerCardProps = {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: number) => void;
  onViewHistory?: (customer: Customer) => void;
};

const CustomerCard = ({
  customer,
  onEdit,
  onDelete,
  onViewHistory,
}: CustomerCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{customer.name}</CardTitle>
          {customer.regular && (
            <Badge className="bg-amber-500 hover:bg-amber-600 gap-1">
              <Star className="w-3 h-3" /> Regular
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-3.5 h-3.5" />
          <span>{customer.phone}</span>
        </div>
        {customer.email && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-3.5 h-3.5" />
            <span>{customer.email}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>
            {customer.totalOrders} order(s)
            {customer.regular && (
              <span className="text-xs"> (≥{customer.regularThreshold} = regular)</span>
            )}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-3">
          <Button variant="outline" size="sm" onClick={() => onEdit(customer)}>
            Edit
          </Button>
          {onViewHistory && (
            <Button variant="secondary" size="sm" onClick={() => onViewHistory(customer)}>
              <History className="w-3 h-3 mr-1" /> Bills
            </Button>
          )}
          <Button variant="destructive" size="sm" onClick={() => onDelete(customer.customerId)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
