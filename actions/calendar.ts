"use server";

import { api } from "@/lib/api-client";
import {
  ActionResponse,
  CalendarDay,
  BlockDatesDto,
  SeasonalPricingDto,
  BlockedDate,
  SeasonalPricing,
} from "@/types";

// ============ PUBLIC ENDPOINTS ============

export async function getMonthlyCalendarAction(
  roomId: number,
  month: string // Format: YYYY-MM
): Promise<ActionResponse<CalendarDay[]>> {
  return api.get<CalendarDay[]>(`/api/calendar/rooms/${roomId}?month=${month}`);
}

// ============ SELLER ENDPOINTS ============

export async function blockDatesAction(
  roomId: number,
  data: BlockDatesDto
): Promise<ActionResponse<BlockedDate>> {
  return api.post<BlockedDate>(`/api/calendar/rooms/${roomId}/block`, data);
}

export async function addSeasonalPricingAction(
  roomId: number,
  data: SeasonalPricingDto
): Promise<ActionResponse<SeasonalPricing>> {
  return api.post<SeasonalPricing>(
    `/api/calendar/rooms/${roomId}/seasonal-pricing`,
    data
  );
}
