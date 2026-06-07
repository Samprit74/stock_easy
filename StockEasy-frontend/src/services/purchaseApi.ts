import { httpRequest } from "./httpClient";
import type {
  Page,
  PageResponse,
  PurchaseRequest,
  PurchaseResponse,
} from "@/types";

function toPage<T>(res: PageResponse<T>, fallbackPage: number): Page<T> {
  return {
    items: res.content ?? [],
    currentPage: res.number ?? fallbackPage,
    totalPages: res.totalPages ?? 0,
    totalItems: res.totalElements ?? 0,
  };
}

export function createPurchase(payload: PurchaseRequest): Promise<string> {
  return httpRequest<string>("/purchases", {
    method: "POST",
    body: payload,
  });
}

export function getPurchases(
  page = 0,
  size = 10
): Promise<Page<PurchaseResponse>> {
  return httpRequest<PageResponse<PurchaseResponse>>("/purchases", {
    query: { page, size },
  }).then((res) => toPage(res, page));
}

export function getPurchaseById(id: number): Promise<PurchaseResponse> {
  return httpRequest<PurchaseResponse>(`/purchases/${id}`);
}

export function getPurchasesByDate(
  start: string,
  end: string,
  page = 0,
  size = 10
): Promise<Page<PurchaseResponse>> {
  return httpRequest<PageResponse<PurchaseResponse>>("/purchases/by-date", {
    query: { start, end, page, size },
  }).then((res) => toPage(res, page));
}

export function getPurchasesBySupplier(
  supplierId: number,
  page = 0,
  size = 10
): Promise<Page<PurchaseResponse>> {
  return httpRequest<PageResponse<PurchaseResponse>>(
    `/purchases/by-supplier/${supplierId}`,
    { query: { page, size } }
  ).then((res) => toPage(res, page));
}
