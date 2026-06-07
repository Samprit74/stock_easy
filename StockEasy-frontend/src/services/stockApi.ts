import { httpRequest } from "./httpClient";
import type {
  BatchItem,
  DashboardSummary,
  ExpiredStockReport,
  LowStockMedicine,
} from "@/types";

export function getExpiredStock(): Promise<BatchItem[]> {
  return httpRequest<BatchItem[]>("/batch-items/expired");
}

export function getExpiredStockReport(
  asOf?: string
): Promise<ExpiredStockReport> {
  return httpRequest<ExpiredStockReport>("/batch-items/expired-report", {
    query: asOf ? { asOf } : undefined,
  });
}

export function getExpiringSoonStock(days = 30): Promise<BatchItem[]> {
  return httpRequest<BatchItem[]>("/batch-items/expiring-soon", {
    query: { days },
  });
}

export function getBatchesByMedicine(medicineId: number): Promise<BatchItem[]> {
  return httpRequest<BatchItem[]>(`/batch-items/medicine/${medicineId}`);
}

export function getBatchesByBatch(batchId: number): Promise<BatchItem[]> {
  return httpRequest<BatchItem[]>(`/batch-items/batch/${batchId}`);
}

export function getLowStockMedicines(
  threshold = 10
): Promise<LowStockMedicine[]> {
  return httpRequest<LowStockMedicine[]>("/batch-items/low-stock", {
    query: { threshold },
  });
}

export function getDashboardSummary(): Promise<DashboardSummary> {
  return httpRequest<DashboardSummary>("/dashboard/summary");
}
