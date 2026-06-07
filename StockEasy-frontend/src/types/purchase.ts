export interface PurchaseItemRequest {
  medicineId: number;
  quantity: number;
  manufactureDate?: string;
  expiryDate: string;
  buyPrice: number;
}

export interface PurchaseRequest {
  supplierId: number;
  batchNumber?: string;
  invoiceNo: string;
  purchaseDate: string;
  items: PurchaseItemRequest[];
}

export interface PurchaseLineItem {
  batchItemId: number;
  medicineId: number | null;
  medicineName: string | null;
  quantity: number;
  manufactureDate: string | null;
  expiryDate: string | null;
  buyPrice: number;
}

export interface PurchaseResponse {
  batchId: number;
  batchNumber: string | null;
  invoiceNo: string;
  purchaseDate: string;
  supplierId: number | null;
  supplierName: string | null;
  items: PurchaseLineItem[];
}
