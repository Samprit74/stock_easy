// src/services/batchItemApi.ts

import { apiRequest } from "./api";

/**
 * Medicine info inside BatchItem
 * Matches backend Medicine entity (nested)
 */
export interface BatchMedicine {
  medicineId: number;
  medicineName: string;
  brand: string;
  category: string;
}

/**
 * Batch item type
 * Matches backend BatchItem entity response
 */
export interface BatchItem {
  batchItemId: number;
  quantityAvailable: number;
  manufactureDate: string; // YYYY-MM-DD
  expiryDate: string;      // YYYY-MM-DD
  buyPrice: number;
  medicine: BatchMedicine;
}

/**
 * Get expiring stock
 * Backend: GET /api/batch-items/expiring-soon?days=30
 *
 * @param days number of days from today (default: 30)
 */
export async function getExpiringStock(
  days: number = 30
): Promise<BatchItem[]> {
  try {
    const response = await apiRequest<BatchItem[]>(
      `/batch-items/expiring-soon?days=${days}`
    );

    return response ?? [];
  } catch (error) {
    console.error("Failed to fetch expiring stock:", error);
    return [];
  }
}

/**
 * Get expired stock
 * Backend: GET /api/batch-items/expired
 */
export async function getExpiredStock(): Promise<BatchItem[]> {
  try {
    const response = await apiRequest<BatchItem[]>(
      "/batch-items/expired"
    );

    return response ?? [];
  } catch (error) {
    console.error("Failed to fetch expired stock:", error);
    return [];
  }
}
