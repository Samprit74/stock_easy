export interface TopMedicine {
  medicineName: string;
  totalQuantity: number;
  totalRevenue: number;
}

export interface TopCustomer {
  customerId: number;
  customerName: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
}

export interface DailyRevenue {
  day: string;
  revenue: number;
}

export interface RevenueSummary {
  start: string;
  end: string;
  totalRevenue: number;
}
