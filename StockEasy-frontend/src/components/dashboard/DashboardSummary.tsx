// components/dashboard/DashboardSummary.tsx

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { useToast } from "@/components/ui/use-toast";
import {
  getDashboardSummary,
} from "@/services";
import type { DashboardSummary as SummaryType } from "@/types";

const DashboardSummary = () => {
  const { toast } = useToast();
  const [summary, setSummary] = useState<SummaryType | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch {
        toast({
          title: "Failed to load dashboard summary",
          variant: "destructive",
        });
      }
    };

    load();
  }, []);

  if (!summary) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Medicines"
        value={summary.totalMedicines}
      />
      <StatCard
        title="Total Customers"
        value={summary.totalCustomers}
      />
      <StatCard
        title="Expiring Soon"
        value={summary.expiringSoon}
        subtitle="Next 30 days"
      />
      <StatCard
        title="Monthly Sales"
        value={`₹ ${summary.monthlySales}`}
      />
    </div>
  );
};

export default DashboardSummary;
