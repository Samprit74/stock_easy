// src/services/dashboardApi.ts

import { apiRequest } from "./api";

/**
 * Dashboard summary
 * Matches backend DashboardResponseDto
 */
export interface DashboardSummary {
  totalMedicines: number;
  totalCustomers: number;
  monthlySales: number;
  expiringSoon: number;
  expired: number;
}

/**
 * Get dashboard summary
 * Backend: GET /api/dashboard/summary
 */
export function getDashboardSummary(): Promise<DashboardSummary> {
  return apiRequest<DashboardSummary>("/dashboard/summary");
}
