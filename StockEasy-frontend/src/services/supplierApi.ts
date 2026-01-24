// src/services/supplierApi.ts

import { apiRequest } from "./api";

/**
 * Supplier type (matches backend Supplier entity)
 */
export interface Supplier {
  supplierId: number;
  name: string;
  phone: string;
  email: string;
}

/**
 * Create supplier payload
 */
export interface CreateSupplierRequest {
  name: string;
  phone: string;
  email?: string;
}

/**
 * Update supplier payload
 */
export interface UpdateSupplierRequest {
  name: string;
  phone: string;
  email?: string;
}

/**
 * Get suppliers (NO pagination on frontend yet)
 * Backend supports pagination, but this works fine for now
 */
export function getSuppliers(): Promise<Supplier[]> {
  return apiRequest<Supplier[]>("/suppliers");
}

/**
 * Get supplier by ID
 */
export function getSupplierById(id: number): Promise<Supplier> {
  return apiRequest<Supplier>(`/suppliers/${id}`);
}

/**
 * Create supplier
 */
export function createSupplier(
  payload: CreateSupplierRequest
): Promise<Supplier> {
  return apiRequest<Supplier>("/suppliers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Update supplier
 */
export function updateSupplier(
  supplierId: number,
  payload: UpdateSupplierRequest
): Promise<Supplier> {
  return apiRequest<Supplier>(`/suppliers/${supplierId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * Delete supplier
 */
export function deleteSupplier(supplierId: number): Promise<void> {
  return apiRequest<void>(`/suppliers/${supplierId}`, {
    method: "DELETE",
  });
}
