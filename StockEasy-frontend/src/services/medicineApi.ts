// src/services/medicineApi.ts

import { apiRequest } from "./api";

/**
 * Medicine type (matches backend entity)
 */
export interface Medicine {
  medicineId: number;
  medicineName: string;
  brand: string;
  category: string;
}

/**
 * Backend Page response (minimal)
 */
interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

/**
 * Safe paginated response for frontend
 */
export interface PaginatedMedicines {
  items: Medicine[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
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
 * Get medicines with pagination
 * Backend: GET /api/medicines?page=&size=
 */
export async function getMedicines(
  page = 0,
  size = 5
): Promise<PaginatedMedicines> {
  try {
    const response = await apiRequest<PageResponse<Medicine>>(
      `/medicines?page=${page}&size=${size}`
    );

    return {
      items: response.content ?? [],
      currentPage: response.number ?? page,
      totalPages: response.totalPages ?? 0,
      totalItems: response.totalElements ?? 0,
    };
  } catch (error) {
    console.error("Failed to fetch medicines:", error);

    return {
      items: [],
      currentPage: page,
      totalPages: 0,
      totalItems: 0,
    };
  }
}

/**
 * Get medicine by ID
 */
export async function getMedicineById(
  medicineId: number
): Promise<Medicine | null> {
  try {
    return await apiRequest<Medicine>(`/medicines/${medicineId}`);
  } catch (error) {
    console.error("Failed to fetch medicine:", error);
    return null;
  }
}

/**
 * Create medicine
 */
export async function createMedicine(
  payload: CreateMedicineRequest
): Promise<Medicine | null> {
  try {
    return await apiRequest<Medicine>("/medicines", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to create medicine:", error);
    return null;
  }
}

/**
 * Update medicine
 */
export async function updateMedicine(
  medicineId: number,
  payload: UpdateMedicineRequest
): Promise<Medicine | null> {
  try {
    return await apiRequest<Medicine>(`/medicines/${medicineId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to update medicine:", error);
    return null;
  }
}

/**
 * Delete medicine
 */
export async function deleteMedicine(medicineId: number): Promise<boolean> {
  try {
    await apiRequest<void>(`/medicines/${medicineId}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error("Failed to delete medicine:", error);
    return false;
  }
}
