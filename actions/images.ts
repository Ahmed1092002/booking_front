"use server";

import { api, apiUpload } from "@/lib/api-client";
import {
  ActionResponse,
  HotelImage,
  RoomImage,
  UploadImageResponse,
} from "@/types";

// ============ PUBLIC ENDPOINTS ============

export async function getHotelImagesAction(
  hotelId: number
): Promise<ActionResponse<HotelImage[]>> {
  return api.get<HotelImage[]>(`/api/images/hotels/${hotelId}`);
}

export async function getRoomImagesAction(
  roomId: number
): Promise<ActionResponse<RoomImage[]>> {
  return api.get<RoomImage[]>(`/api/images/rooms/${roomId}`);
}

// ============ SELLER ENDPOINTS ============

export async function uploadHotelImageAction(
  hotelId: number,
  formData: FormData
): Promise<ActionResponse<UploadImageResponse>> {
  return apiUpload<UploadImageResponse>(
    `/api/images/hotels/${hotelId}`,
    formData
  );
}

export async function uploadRoomImageAction(
  roomId: number,
  formData: FormData
): Promise<ActionResponse<UploadImageResponse>> {
  return apiUpload<UploadImageResponse>(
    `/api/images/rooms/${roomId}`,
    formData
  );
}

export async function setPrimaryImageAction(
  hotelId: number,
  imageId: number
): Promise<ActionResponse> {
  return api.put(`/api/images/hotels/${hotelId}/${imageId}/primary`, {});
}

export async function deleteImageAction(
  hotelId: number,
  imageId: number
): Promise<ActionResponse> {
  return api.delete(`/api/images/hotels/${hotelId}/${imageId}`);
}
