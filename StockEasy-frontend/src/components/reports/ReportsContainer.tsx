import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, Users, Calendar, DollarSign } from "lucide-react";
import ReportsFilters, { monthAgoIso, todayIso } from "./ReportsFilters";
import {
  getTopMedicines,
  getTopCustomers,
  getDailyRevenue,
  getRevenueSummary,
} from "@/services";
import { getErrorMessage, isApiError } from "@/services";
import type {
  DailyRevenue,
  RevenueSummary,
  TopCustomer,
  TopMedicine,
} from "@/types";
import { useToast } from "@/components/ui/use-toast";

const ReportsContainer = () => {
  const { toast } = useToast();
  const [start, setStart] = useState(monthAgoIso());
  const [end, setEnd] = useState(todayIso());
  const [loading, setLoading] = useState(false);
  const [topMeds, setTopMeds] = useState<TopMedicine[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [daily, setDaily] = useState<DailyRevenue[]>([]);
  const [revenue, setRevenue] = useState<RevenueSummary | null>(null);

  const load = async () => {
    if (!start || !end || start > end) {
      toast({
        title: "Invalid range",
        description: "Start date must be before end date",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const [meds, customers, dailyRev, summary] = await Promise.all([
        getTopMedicines(start, end, 10),
        getTopCustomers(start, end, 10),
        getDailyRevenue(start, end),
        getRevenueSummary(start, end),
      ]);
      setTopMeds(meds);
      setTopCustomers(customers);
      setDaily(dailyRev);
      setRevenue(summary);
    } catch (e) {
      const msg = isApiError(e) && e.status === 403
        ? "Admins only."
        : getErrorMessage(e);
      toast({ title: "Failed to load reports", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <ReportsFilters
        start={start}
        end={end}
        onChange={(s, e) => {
          setStart(s);
          setEnd(e);
        }}
        onApply={load}
        loading={loading}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          icon={<DollarSign className="w-5 h-5 text-green-500" />}
          label="Total Revenue"
          value={`₹${(revenue?.totalRevenue ?? 0).toFixed(2)}`}
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
          label="Top Medicines"
          value={String(topMeds.length)}
        />
        <SummaryCard
          icon={<Users className="w-5 h-5 text-purple-500" />}
          label="Top Customers"
          value={String(topCustomers.length)}
        />
      </div>

      <Tabs defaultValue="medicines">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="medicines">Top Medicines</TabsTrigger>
          <TabsTrigger value="customers">Top Customers</TabsTrigger>
          <TabsTrigger value="daily">Daily Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="medicines">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Medicines (by quantity sold)</CardTitle>
            </CardHeader>
            <CardContent>
              {topMeds.length === 0 ? (
                <p className="text-sm text-muted-foreground">No sales in this range.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Medicine</TableHead>
                      <TableHead className="text-right">Units Sold</TableHead>
                      <TableHead className="text-right">Revenue (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topMeds.map((m, i) => (
                      <TableRow key={m.medicineName}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell className="font-medium">{m.medicineName}</TableCell>
                        <TableCell className="text-right">{m.totalQuantity}</TableCell>
                        <TableCell className="text-right">{m.totalRevenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Customers (by frequency)</CardTitle>
            </CardHeader>
            <CardContent>
              {topCustomers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No customers in this range.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Spent (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCustomers.map((c, i) => (
                      <TableRow key={c.customerId}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell className="font-medium">{c.customerName}</TableCell>
                        <TableCell>{c.phone}</TableCell>
                        <TableCell className="text-right">{c.orderCount}</TableCell>
                        <TableCell className="text-right">{c.totalSpent.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Daily Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              {daily.length === 0 ? (
                <p className="text-sm text-muted-foreground">No revenue in this range.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Revenue (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {daily.map((d) => (
                      <TableRow key={d.day}>
                        <TableCell>{d.day}</TableCell>
                        <TableCell className="text-right">{d.revenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        {icon}
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportsContainer;
