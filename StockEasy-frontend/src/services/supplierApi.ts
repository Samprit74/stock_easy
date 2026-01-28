// src/services/supplierApi.ts

import { apiRequest } from "./api";

/**
 * Supplier type (matches backend entity)
 */
export interface Supplier {
  supplierId: number;
  name: string;
  phone: string;
  email: string;
}

/**
 * Backend Page response (minimal)
 */
interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

/**
 * Safe paginated response for frontend
 */
export interface PaginatedSuppliers {
  items: Supplier[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
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
 * Get suppliers with pagination
 * Backend: GET /api/suppliers?page=&size=
 */
export async function getSuppliers(
  page = 0,
  size = 5
): Promise<PaginatedSuppliers> {
  try {
    const response = await apiRequest<PageResponse<Supplier>>(
      `/suppliers?page=${page}&size=${size}`
    );

    return {
      items: response.content ?? [],
      currentPage: response.number ?? page,
      totalPages: response.totalPages ?? 0,
      totalItems: response.totalElements ?? 0,
    };
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);

    return {
      items: [],
      currentPage: page,
      totalPages: 0,
      totalItems: 0,
    };
  }
}

/**
 * Get supplier by ID
 */
export async function getSupplierById(
  supplierId: number
): Promise<Supplier | null> {
  try {
    return await apiRequest<Supplier>(`/suppliers/${supplierId}`);
  } catch (error) {
    console.error("Failed to fetch supplier:", error);
    return null;
  }
}

/**
 * Create supplier
 */
export async function createSupplier(
  payload: CreateSupplierRequest
): Promise<Supplier | null> {
  try {
    return await apiRequest<Supplier>("/suppliers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to create supplier:", error);
    return null;
  }
}

/**
 * Update supplier
 */
export async function updateSupplier(
  supplierId: number,
  payload: UpdateSupplierRequest
): Promise<Supplier | null> {
  try {
    return await apiRequest<Supplier>(`/suppliers/${supplierId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to update supplier:", error);
    return null;
  }
}

/**
 * Delete supplier
 */
export async function deleteSupplier(supplierId: number): Promise<boolean> {
  try {
    await apiRequest<void>(`/suppliers/${supplierId}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error("Failed to delete supplier:", error);
    return false;
  }
}
