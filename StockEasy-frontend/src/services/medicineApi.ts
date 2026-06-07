import { httpRequest } from "./httpClient";
import type {
  CreateMedicineRequest,
  Medicine,
  Page,
  PageResponse,
  UpdateMedicineRequest,
} from "@/types";

export type { Medicine, CreateMedicineRequest, UpdateMedicineRequest, Page } from "@/types";
export type PaginatedMedicines = Page<Medicine>;

function toPage<T>(res: PageResponse<T>, fallbackPage: number): Page<T> {
  return {
    items: res.content ?? [],
    currentPage: res.number ?? fallbackPage,
    totalPages: res.totalPages ?? 0,
    totalItems: res.totalElements ?? 0,
  };
}

export function getMedicines(page = 0, size = 5): Promise<Page<Medicine>> {
  return httpRequest<PageResponse<Medicine>>("/medicines", {
    query: { page, size },
  }).then((res) => toPage(res, page));
}

export function getMedicineById(id: number): Promise<Medicine> {
  return httpRequest<Medicine>(`/medicines/${id}`);
}

export function createMedicine(payload: CreateMedicineRequest): Promise<Medicine> {
  return httpRequest<Medicine>("/medicines", {
    method: "POST",
    body: payload,
  });
}

export function updateMedicine(
  id: number,
  payload: UpdateMedicineRequest
): Promise<Medicine> {
  return httpRequest<Medicine>(`/medicines/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteMedicine(id: number): Promise<void> {
  return httpRequest<void>(`/medicines/${id}`, { method: "DELETE" });
}

export function getMedicinesByCategory(category: string): Promise<Medicine[]> {
  return httpRequest<Medicine[]>(`/medicines/category/${encodeURIComponent(category)}`);
}

export function getMedicinesByBrand(brand: string): Promise<Medicine[]> {
  return httpRequest<Medicine[]>(`/medicines/brand/${encodeURIComponent(brand)}`);
}

export function searchMedicines(q: string): Promise<Medicine[]> {
  return httpRequest<Medicine[]>("/medicines/search", { query: { q } });
}
