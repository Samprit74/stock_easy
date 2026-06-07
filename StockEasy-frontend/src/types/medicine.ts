export interface Medicine {
  medicineId: number;
  medicineName: string;
  brand: string;
  category: string;
  defaultSellPrice: number | null;
}

export interface CreateMedicineRequest {
  medicineName: string;
  brand: string;
  category: string;
  defaultSellPrice?: number | null;
}

export interface UpdateMedicineRequest {
  medicineName: string;
  brand: string;
  category: string;
  defaultSellPrice?: number | null;
}
