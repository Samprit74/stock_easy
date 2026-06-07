import { httpRequest } from "./httpClient";
import type {
  CreateSupplierRequest,
  Page,
  PageResponse,
  Supplier,
  UpdateSupplierRequest,
} from "@/types";

export type { Supplier, CreateSupplierRequest, UpdateSupplierRequest, Page } from "@/types";
export type PaginatedSuppliers = Page<Supplier>;

function toPage<T>(res: PageResponse<T>, fallbackPage: number): Page<T> {
  return {
    items: res.content ?? [],
    currentPage: res.number ?? fallbackPage,
    totalPages: res.totalPages ?? 0,
    totalItems: res.totalElements ?? 0,
  };
}

export function getSuppliers(page = 0, size = 5): Promise<Page<Supplier>> {
  return httpRequest<PageResponse<Supplier>>("/suppliers", {
    query: { page, size },
  }).then((res) => toPage(res, page));
}

export function getSupplierById(id: number): Promise<Supplier> {
  return httpRequest<Supplier>(`/suppliers/${id}`);
}

export function createSupplier(payload: CreateSupplierRequest): Promise<Supplier> {
  return httpRequest<Supplier>("/suppliers", {
    method: "POST",
    body: payload,
  });
}

export function updateSupplier(
  id: number,
  payload: UpdateSupplierRequest
): Promise<Supplier> {
  return httpRequest<Supplier>(`/suppliers/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteSupplier(id: number): Promise<void> {
  return httpRequest<void>(`/suppliers/${id}`, { method: "DELETE" });
}
