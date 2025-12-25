"use server";

import { api } from "@/lib/api-client";
import { ActionResponse, Booking, CreateBookingDto } from "@/types";

// ============ PROTECTED ENDPOINTS ============

export async function createBookingAction(
  roomId: number,
  data: CreateBookingDto
): Promise<ActionResponse<Booking>> {
  return api.post<Booking>("/api/bookings", { ...data, roomId });
}

export async function getMyBookingsAction(): Promise<
  ActionResponse<Booking[]>
> {
  return api.get<Booking[]>("/api/bookings/my-bookings", true);
}

export async function cancelBookingAction(
  bookingId: number
): Promise<ActionResponse> {
  // Fixed: Swagger specifies POST, not PUT
  return api.post(`/api/bookings/${bookingId}/cancel`, {}, true);
}
