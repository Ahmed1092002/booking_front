"use server";

import { api } from "@/lib/api-client";
import {
  ActionResponse,
  SystemStatistics,
  User,
  AuditLog,
  DiscountCode,
  CreateDiscountCodeDto,
  UpdateDiscountCodeDto,
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

// ============ DISCOUNT CODE ENDPOINTS ============

export async function createDiscountCodeAction(
  data: CreateDiscountCodeDto
): Promise<ActionResponse<DiscountCode>> {
  return api.post<DiscountCode>("/api/promotions/discount-codes", data, true);
}

export async function getAllDiscountCodesAction(): Promise<
  ActionResponse<DiscountCode[]>
> {
  return api.get<DiscountCode[]>("/api/promotions/discount-codes", true);
}

export async function getDiscountCodeByIdAction(
  id: number
): Promise<ActionResponse<DiscountCode>> {
  return api.get<DiscountCode>(`/api/promotions/discount-codes/${id}`, true);
}

export async function updateDiscountCodeAction(
  id: number,
  data: UpdateDiscountCodeDto
): Promise<ActionResponse<DiscountCode>> {
  return api.put<DiscountCode>(
    `/api/promotions/discount-codes/${id}`,
    data,
    true
  );
}

export async function deleteDiscountCodeAction(
  id: number
): Promise<ActionResponse<void>> {
  return api.delete(`/api/promotions/discount-codes/${id}`, true);
}

export async function toggleDiscountCodeStatusAction(
  id: number
): Promise<ActionResponse<DiscountCode>> {
  return api.patch<DiscountCode>(
    `/api/promotions/discount-codes/${id}/status`,
    {},
    true
  );
}

// ============ USER AUDIT LOGS ============

export async function getUserAuditLogsAction(
  userId: number
): Promise<ActionResponse<AuditLog[]>> {
  return api.get<AuditLog[]>(`/api/admin/audit-logs/user/${userId}`, true);
}
