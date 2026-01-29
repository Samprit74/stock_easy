import { apiRequest } from "./api";

export interface BatchMedicine {
  medicineId: number;
  medicineName: string;
  brand: string;
  category: string;
}

export interface BatchItem {
  batchItemId: number;
  quantityAvailable: number;
  manufactureDate: string;
  expiryDate: string;
  buyPrice: number;
  medicine: BatchMedicine;
}

export function getExpiringStock(days = 30): Promise<BatchItem[]> {
  return apiRequest(`/batch-items/expiring-soon?days=${days}`);
}

export function getExpiredStock(): Promise<BatchItem[]> {
  return apiRequest("/batch-items/expired");
}
