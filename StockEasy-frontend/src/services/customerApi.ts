// src/services/customerApi.ts

import { apiRequest } from "./api";

/**
 * Customer type (matches backend Customer entity)
 */
export interface Customer {
  customerId: number;
  name: string;
  phone: string;
  email: string;
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
 * Get all customers
 */
export function getCustomers(): Promise<Customer[]> {
  return apiRequest<Customer[]>("/customers");
}

/**
 * Get customer by ID
 */
export function getCustomerById(customerId: number): Promise<Customer> {
  return apiRequest<Customer>(`/customers/${customerId}`);
}

/**
 * Create customer
 * Backend auto-handles "create or get by phone"
 */
export function createCustomer(
  payload: CreateCustomerRequest
): Promise<Customer> {
  return apiRequest<Customer>("/customers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Update customer
 */
export function updateCustomer(
  customerId: number,
  payload: UpdateCustomerRequest
): Promise<Customer> {
  return apiRequest<Customer>(`/customers/${customerId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * Delete customer
 */
export function deleteCustomer(customerId: number): Promise<void> {
  return apiRequest<void>(`/customers/${customerId}`, {
    method: "DELETE",
  });
}
