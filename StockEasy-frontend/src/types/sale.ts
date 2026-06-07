export interface SaleCustomerPayload {
  name: string;
  phone: string;
  email?: string;
}

export interface SaleItemRequest {
  medicineId: number;
  quantity: number;
  sellPrice: number;
}

export interface SaleRequest {
  customer: SaleCustomerPayload;
  totalAmount: number;
  items: SaleItemRequest[];
}

export interface SaleItemResponse {
  medicineName: string | null;
  quantity: number;
  sellPrice: number;
}

export interface SaleResponse {
  saleId: number;
  customerName: string | null;
  customerPhone: string | null;
  saleDate: string;
  totalAmount: number;
  returned: boolean;
  items: SaleItemResponse[];
}
