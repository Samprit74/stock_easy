// src/services/customerApi.ts

import { apiRequest } from "./api";

/**
 * Customer type (matches backend entity)
 */
export interface Customer {
  customerId: number;
  name: string;
  phone: string;
  email: string;
}

/**
 * Backend Page response (minimal fields we care about)
 */
interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // current page
  size: number;
}

/**
 * Safe paginated response for frontend
 * Frontend NEVER sees Spring Page<>
 */
export interface PaginatedCustomers {
  items: Customer[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

/**
 * Create customer payload
 */
export interface CreateCustomerRequest {
  name: string;
  phone: string;
  email?: string;
}

/**
 * Update customer payload
 */
export interface UpdateCustomerRequest {
  name: string;
  phone: string;
  email?: string;
}

/**
 * Get customers with pagination
 * Backend: GET /api/customers?page=&size=
 *
 * This supports:
 * - Next / Previous buttons
 * - Page numbers
 * - Safe fallback on error
 */
export async function getCustomers(
  page = 0,
  size = 5
): Promise<PaginatedCustomers> {
  try {
    const response = await apiRequest<PageResponse<Customer>>(
      `/customers?page=${page}&size=${size}`
    );

    return {
      items: response.content ?? [],
      currentPage: response.number ?? page,
      totalPages: response.totalPages ?? 0,
      totalItems: response.totalElements ?? 0,
    };
  } catch (error) {
    console.error("Failed to fetch customers:", error);

    // Safe fallback so UI never crashes
    return {
      items: [],
      currentPage: page,
      totalPages: 0,
      totalItems: 0,
    };
  }
}

/**
 * Get customer by ID
 */
export async function getCustomerById(
  customerId: number
): Promise<Customer | null> {
  try {
    return await apiRequest<Customer>(`/customers/${customerId}`);
  } catch (error) {
    console.error("Failed to fetch customer:", error);
    return null;
  }
}

/**
 * Create customer
 * Backend auto-handles "create or get by phone"
 */
export async function createCustomer(
  payload: CreateCustomerRequest
): Promise<Customer | null> {
  try {
    return await apiRequest<Customer>("/customers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to create customer:", error);
    return null;
  }
}

/**
 * Update customer
 */
export async function updateCustomer(
  customerId: number,
  payload: UpdateCustomerRequest
): Promise<Customer | null> {
  try {
    return await apiRequest<Customer>(`/customers/${customerId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to update customer:", error);
    return null;
  }
}

/**
 * Delete customer
 */
export async function deleteCustomer(customerId: number): Promise<boolean> {
  try {
    await apiRequest<void>(`/customers/${customerId}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return false;
  }
}
