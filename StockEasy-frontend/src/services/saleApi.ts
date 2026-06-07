import { httpRequest } from "./httpClient";
import type {
  Page,
  PageResponse,
  SaleRequest,
  SaleResponse,
} from "@/types";

function toPage<T>(res: PageResponse<T>, fallbackPage: number): Page<T> {
  return {
    items: res.content ?? [],
    currentPage: res.number ?? fallbackPage,
    totalPages: res.totalPages ?? 0,
    totalItems: res.totalElements ?? 0,
  };
}

export function createSale(payload: SaleRequest): Promise<string> {
  return httpRequest<string>("/sales", {
    method: "POST",
    body: payload,
  });
}

export function getSales(page = 0, size = 10): Promise<Page<SaleResponse>> {
  return httpRequest<PageResponse<SaleResponse>>("/sales", {
    query: { page, size },
  }).then((res) => toPage(res, page));
}

export function getSaleById(id: number): Promise<SaleResponse> {
  return httpRequest<SaleResponse>(`/sales/${id}`);
}

export function getSalesByCustomer(
  customerId: number,
  page = 0,
  size = 10
): Promise<Page<SaleResponse>> {
  return httpRequest<PageResponse<SaleResponse>>(
    `/sales/by-customer/${customerId}`,
    { query: { page, size } }
  ).then((res) => toPage(res, page));
}

export function getMyBills(
  page = 0,
  size = 10
): Promise<Page<SaleResponse>> {
  return httpRequest<PageResponse<SaleResponse>>("/sales/my-bills", {
    query: { page, size },
  }).then((res) => toPage(res, page));
}

export function returnSale(id: number): Promise<string> {
  return httpRequest<string>(`/sales/${id}/return`, { method: "POST" });
}
