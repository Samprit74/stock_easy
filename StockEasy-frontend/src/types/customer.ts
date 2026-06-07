export interface Customer {
  customerId: number;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  regularThreshold: number;
  regular: boolean;
}

export interface CreateCustomerRequest {
  name: string;
  phone: string;
  email?: string;
}

export interface UpdateCustomerRequest {
  name: string;
  phone: string;
  email?: string;
}
