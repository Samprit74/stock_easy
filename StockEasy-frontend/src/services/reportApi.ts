import { httpRequest } from "./httpClient";
import type {
  DailyRevenue,
  RevenueSummary,
  TopCustomer,
  TopMedicine,
} from "@/types";

export function getTopMedicines(
  start: string,
  end: string,
  limit = 10
): Promise<TopMedicine[]> {
  return httpRequest<TopMedicine[]>("/reports/top-medicines", {
    query: { start, end, limit },
  });
}

export function getTopCustomers(
  start: string,
  end: string,
  limit = 10
): Promise<TopCustomer[]> {
  return httpRequest<TopCustomer[]>("/reports/top-customers", {
    query: { start, end, limit },
  });
}

export function getDailyRevenue(
  start: string,
  end: string
): Promise<DailyRevenue[]> {
  return httpRequest<DailyRevenue[]>("/reports/daily-revenue", {
    query: { start, end },
  });
}

export function getRevenueSummary(
  start: string,
  end: string
): Promise<RevenueSummary> {
  return httpRequest<RevenueSummary>("/reports/revenue", {
    query: { start, end },
  });
}
