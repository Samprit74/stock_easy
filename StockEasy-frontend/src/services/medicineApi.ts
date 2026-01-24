// src/services/medicineApi.ts

import { apiRequest } from "./api";

/**
 * Medicine type (matches backend Medicine entity)
 */
export interface Medicine {
  medicineId: number;
  medicineName: string;
  brand: string;
  category: string;
}

/**
 * Create medicine payload
 */
export interface CreateMedicineRequest {
  medicineName: string;
  brand: string;
  category: string;
}

/**
 * Update medicine payload
 */
export interface UpdateMedicineRequest {
  medicineName: string;
  brand: string;
  category: string;
}

/**
 * Get all medicines
 */
export function getMedicines(): Promise<Medicine[]> {
  return apiRequest<Medicine[]>("/medicines");
}

/**
 * Get medicine by ID
 */
export function getMedicineById(medicineId: number): Promise<Medicine> {
  return apiRequest<Medicine>(`/medicines/${medicineId}`);
}

/**
 * Create medicine
 */
export function createMedicine(
  payload: CreateMedicineRequest
): Promise<Medicine> {
  return apiRequest<Medicine>("/medicines", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Update medicine
 */
export function updateMedicine(
  medicineId: number,
  payload: UpdateMedicineRequest
): Promise<Medicine> {
  return apiRequest<Medicine>(`/medicines/${medicineId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * Delete medicine
 */
export function deleteMedicine(medicineId: number): Promise<void> {
  return apiRequest<void>(`/medicines/${medicineId}`, {
    method: "DELETE",
  });
}
