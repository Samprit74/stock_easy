export interface BatchItemMedicine {
  medicineId: number;
  medicineName: string;
  brand: string;
  category: string;
}

export interface BatchItem {
  batchItemId: number;
  batchId: number | null;
  batchNumber: string | null;
  medicineId: number | null;
  medicineName: string | null;
  brand: string | null;
  category: string | null;
  quantityAvailable: number;
  manufactureDate: string | null;
  expiryDate: string | null;
  buyPrice: number;
}

export interface LowStockMedicine {
  medicineId: number;
  medicineName: string;
  brand: string;
  category: string;
  totalAvailable: number;
  threshold: number;
}

export interface ExpiredStockLine {
  medicineName: string;
  brand: string;
  category: string;
  batchNumber: string | null;
  expiryDate: string;
  quantityExpired: number;
  buyPrice: number;
  totalLoss: number;
}

export interface ExpiredStockReport {
  asOf: string;
  totalExpiredBatches: number;
  totalExpiredUnits: number;
  totalLoss: number;
  items: ExpiredStockLine[];
}

export interface DashboardSummary {
  totalMedicines: number;
  totalCustomers: number;
  monthlySales: number;
  expiringSoon: number;
  expired: number;
}

export interface DiscountInfo {
  daysUntilExpiry: number;
  discountPercent: number;
  originalPrice: number;
  finalPrice: number;
}
