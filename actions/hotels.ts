"use server";

import { api } from "@/lib/api-client";
import {
  ActionResponse,
  Hotel,
  CreateHotelDto,
  CreateRoomDto,
  HotelSearchFilters,
  Room,
} from "@/types";

// ============ PUBLIC ENDPOINTS ============

export async function getHotelsAction(): Promise<ActionResponse<Hotel[]>> {
  return api.get<Hotel[]>("/api/hotels");
}

export async function getHotelByIdAction(
  id: number
): Promise<ActionResponse<Hotel>> {
  // NEW: Port 8081 has GET /api/hotels/{id}
  return api.get<Hotel>(`/api/hotels/${id}`);
}

export async function searchHotelsByCityAction(
  city: string
): Promise<ActionResponse<Hotel[]>> {
  return api.get<Hotel[]>(
    `/api/hotels/search?city=${encodeURIComponent(city)}`
  );
}

export async function advancedHotelSearchAction(
  filters: HotelSearchFilters
): Promise<ActionResponse<Hotel[]>> {
  // The response is HotelSearchResponse[], which effectively maps to Hotel[] for our UI
  return api.post<Hotel[]>("/api/hotels/search/advanced", filters, false);
}

// ============ PROTECTED ENDPOINTS (Seller) ============

export async function createHotelAction(
  data: CreateHotelDto
): Promise<ActionResponse<Hotel>> {
  return api.post<Hotel>("/api/hotels", data, true);
}

export async function updateHotelAction(
  hotelId: number,
  data: CreateHotelDto
): Promise<ActionResponse<Hotel>> {
  // NEW: Port 8081 has PUT /api/hotels/{id}
  return api.put<Hotel>(`/api/hotels/${hotelId}`, data, true);
}

export async function deleteHotelAction(
  hotelId: number
): Promise<ActionResponse> {
  // NEW: Port 8081 has DELETE /api/hotels/{id}
  return api.delete(`/api/hotels/${hotelId}`, true);
}

export async function getSellerHotelsAction(): Promise<
  ActionResponse<Hotel[]>
> {
  // NEW: Port 8081 has GET /api/hotels/seller/my-hotels
  return api.get<Hotel[]>("/api/hotels/seller/my-hotels", true);
}

export async function addRoomAction(
  hotelId: number,
  data: CreateRoomDto
): Promise<ActionResponse<Room>> {
  return api.post<Room>(`/api/hotels/${hotelId}/rooms`, data, true);
}
