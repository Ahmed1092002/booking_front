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
import { getCurrentUser } from "./auth";

// ============ PUBLIC ENDPOINTS ============

export async function getHotelsAction(): Promise<ActionResponse<Hotel[]>> {
  return api.get<Hotel[]>("/api/hotels");
}

export async function getHotelByIdAction(
  id: number
): Promise<ActionResponse<Hotel>> {
  // STRICT SWAGGER COMPLIANCE: GET /api/hotels/{id} does not exist.
  // Workaround: Fetch all and find (Inefficient but compliant)
  // Or check if advanced search can help.
  // For now, falling back to 'GetAll' + Filter to ensure we don't call non-existent API.

  const allHotels = await api.get<Hotel[]>("/api/hotels");
  if (!allHotels.success || !allHotels.data) {
    return {
      success: false,
      error: allHotels.error || "Failed to fetch hotels",
    };
  }

  const hotel = allHotels.data.find((h) => h.id === Number(id)); // ID might be number or string in JSON

  if (!hotel) {
    return { success: false, error: "Hotel not found" };
  }

  return { success: true, data: hotel };
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
  _hotelId: number,
  _data: CreateHotelDto
): Promise<ActionResponse<Hotel>> {
  // STRICT SWAGGER COMPLIANCE: PUT /api/hotels/{id} does not exist.
  return {
    success: false,
    error: "Update hotel functionality not supported by API",
  };
}

export async function deleteHotelAction(
  _hotelId: number
): Promise<ActionResponse> {
  // STRICT SWAGGER COMPLIANCE: DELETE /api/hotels/{id} does not exist.
  return {
    success: false,
    error: "Delete hotel functionality not supported by API",
  };
}

export async function getSellerHotelsAction(): Promise<
  ActionResponse<Hotel[]>
> {
  // STRICT SWAGGER COMPLIANCE: GET /api/hotels/seller/my-hotels does not exist.
  // Workaround: Get all hotels and filter by current user ID (Seller).

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const allHotels = await api.get<Hotel[]>("/api/hotels");
  if (!allHotels.success || !allHotels.data) {
    return {
      success: false,
      error: allHotels.error || "Failed to fetch hotels",
    };
  }

  // Filter where sellerId matches
  // Helper to safely check ownership if sellerId is present
  const myHotels = allHotels.data.filter(
    (h: any) => h.sellerId === user.id || (h.seller && h.seller.id === user.id)
  );

  return { success: true, data: myHotels };
}

export async function addRoomAction(
  hotelId: number,
  data: CreateRoomDto
): Promise<ActionResponse<Room>> {
  return api.post<Room>(`/api/hotels/${hotelId}/rooms`, data, true);
}
