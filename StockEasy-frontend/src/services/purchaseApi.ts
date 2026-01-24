// src/services/purchaseApi.ts

import { apiRequest } from "./api";

/**
 * Single item inside a purchase batch
 * Matches PurchaseItemDto
 */
export interface PurchaseItemRequest {
  medicineId: number;
  quantity: number;
  manufactureDate: string; // YYYY-MM-DD
  expiryDate: string;      // YYYY-MM-DD
  buyPrice: number;
}

/**
 * Purchase batch request
 * Matches PurchaseRequestDto
 */
export interface PurchaseRequest {
  supplierId: number;
  invoiceNo: string;
  purchaseDate: string; // YYYY-MM-DD
  items: PurchaseItemRequest[];
}

/**
 * Create purchase batch (Buy stock)
 * Backend: POST /api/purchases
 */
export function createPurchase(
  payload: PurchaseRequest
): Promise<string> {
  return apiRequest<string>("/purchases", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
