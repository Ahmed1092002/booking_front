"use server";

import { api } from "@/lib/api-client";
import {
  ActionResponse,
  SystemStatistics,
  User,
  AuditLog,
  DiscountCode,
  CreateDiscountCodeDto,
  PaginatedResponse,
} from "@/types";

// ============ ADMIN ENDPOINTS ============

export async function getStatisticsAction(): Promise<
  ActionResponse<SystemStatistics>
> {
  return api.get<SystemStatistics>("/api/admin/statistics", true);
}

export async function getAllUsersAction(): Promise<ActionResponse<User[]>> {
  return api.get<User[]>("/api/admin/users", true);
}

export async function getAuditLogsAction(
  page: number = 0,
  size: number = 50
): Promise<ActionResponse<PaginatedResponse<AuditLog>>> {
  return api.get<PaginatedResponse<AuditLog>>(
    `/api/admin/audit-logs?page=${page}&size=${size}`,
    true
  );
}

export async function createDiscountCodeAction(
  data: CreateDiscountCodeDto
): Promise<ActionResponse<DiscountCode>> {
  // Fixed: Endpoint is /api/promotions/discount-codes, not /api/admin/...
  return api.post<DiscountCode>("/api/promotions/discount-codes", data, true);
}

export async function getAllDiscountCodesAction(): Promise<
  ActionResponse<DiscountCode[]>
> {
  // Confirmed in Swagger: GET /api/promotions/discount-codes exists
  return api.get<DiscountCode[]>("/api/promotions/discount-codes", true);
}
