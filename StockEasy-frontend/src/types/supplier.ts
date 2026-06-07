export interface Supplier {
  supplierId: number;
  name: string;
  phone: string;
  email: string;
}

export interface CreateSupplierRequest {
  name: string;
  phone: string;
  email?: string;
}

export interface UpdateSupplierRequest {
  name: string;
  phone: string;
  email?: string;
}
