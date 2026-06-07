import { httpRequest } from "./httpClient";
import type { DiscountInfo } from "@/types";

export function previewDiscount(
  batchItemId: number,
  originalPrice: number
): Promise<DiscountInfo> {
  return httpRequest<DiscountInfo>("/discounts/preview", {
    query: { batchItemId, originalPrice },
  });
}

export function previewDiscountByExpiry(
  expiryDate: string,
  originalPrice: number
): Promise<DiscountInfo> {
  return httpRequest<DiscountInfo>("/discounts/by-expiry", {
    query: { expiryDate, originalPrice },
  });
}
