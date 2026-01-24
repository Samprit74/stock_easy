// src/services/saleApi.ts

import { apiRequest } from "./api";

export interface SaleCustomerPayload {
  name: string;
  phone: string;
  email?: string;
}

export interface SaleItemRequest {
  medicineId: number;
  quantity: number;
  sellPrice: number;
}

export interface SaleRequest {
  customer: SaleCustomerPayload;
  totalAmount: number;
  items: SaleItemRequest[];
}

export function createSale(payload: SaleRequest): Promise<string> {
  return apiRequest<string>("/sales", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
