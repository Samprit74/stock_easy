import { httpRequest } from "./httpClient";
import type {
  CreateCustomerRequest,
  Customer,
  Page,
  PageResponse,
  UpdateCustomerRequest,
} from "@/types";

export type { Customer, CreateCustomerRequest, UpdateCustomerRequest } from "@/types";

function toPage<T>(res: PageResponse<T>, fallbackPage: number): Page<T> {
  return {
    items: res.content ?? [],
    currentPage: res.number ?? fallbackPage,
    totalPages: res.totalPages ?? 0,
    totalItems: res.totalElements ?? 0,
  };
}

export function getCustomers(page = 0, size = 5): Promise<Page<Customer>> {
  return httpRequest<PageResponse<Customer>>("/customers", {
    query: { page, size },
  }).then((res) => toPage(res, page));
}

export function getCustomerById(id: number): Promise<Customer> {
  return httpRequest<Customer>(`/customers/${id}`);
}

export function getCustomerByPhone(phone: string): Promise<Customer> {
  return httpRequest<Customer>(`/customers/by-phone/${encodeURIComponent(phone)}`);
}

export function searchCustomers(q: string): Promise<Customer[]> {
  return httpRequest<Customer[]>("/customers/search", { query: { q } });
}

export function createCustomer(payload: CreateCustomerRequest): Promise<Customer> {
  return httpRequest<Customer>("/customers", {
    method: "POST",
    body: payload,
  });
}

export function updateCustomer(
  id: number,
  payload: UpdateCustomerRequest
): Promise<Customer> {
  return httpRequest<Customer>(`/customers/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteCustomer(id: number): Promise<void> {
  return httpRequest<void>(`/customers/${id}`, { method: "DELETE" });
}
