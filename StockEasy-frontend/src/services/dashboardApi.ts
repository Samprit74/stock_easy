// src/services/dashboardApi.ts

import { apiRequest } from "./api";

/**
 * Dashboard summary
 * EXACT match with backend DashboardResponseDto
 */
export interface DashboardSummary {
  totalMedicines: number;
  totalCustomers: number;
  monthlySales: number;
  expiringSoon: number;
  expired: number;
}

/**
 * Safe default values
 * Used when API fails so UI never crashes
 */
const EMPTY_DASHBOARD_SUMMARY: DashboardSummary = {
  totalMedicines: 0,
  totalCustomers: 0,
  monthlySales: 0,
  expiringSoon: 0,
  expired: 0,
};

/**
 * Get dashboard summary
 * Backend: GET /api/dashboard/summary
 *
 * Design goals:
 * - Matches backend exactly
 * - Never throws to UI by default
 * - Prevents undefined access in components
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    const data = await apiRequest<DashboardSummary>("/dashboard/summary");

    // Defensive check (in case backend changes or returns null)
    if (!data) {
      return EMPTY_DASHBOARD_SUMMARY;
    }

    return {
      totalMedicines: data.totalMedicines ?? 0,
      totalCustomers: data.totalCustomers ?? 0,
      monthlySales: data.monthlySales ?? 0,
      expiringSoon: data.expiringSoon ?? 0,
      expired: data.expired ?? 0,
    };
  } catch (error) {
    console.error("Failed to load dashboard summary:", error);
    return EMPTY_DASHBOARD_SUMMARY;
  }
}
