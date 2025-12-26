"use server";

import { api } from "@/lib/api-client";
import {
  ActionResponse,
  Review,
  CreateReviewDto,
  RespondToReviewDto,
} from "@/types";

// ============ PUBLIC ENDPOINTS ============

export async function getHotelReviewsAction(
  hotelId: number
): Promise<ActionResponse<Review[]>> {
  return api.get<Review[]>(`/api/reviews/hotel/${hotelId}`);
}

// Alias for consistency
export const getReviewsByHotelIdAction = getHotelReviewsAction;

// ============ PROTECTED ENDPOINTS ============

export async function createReviewAction(
  data: CreateReviewDto
): Promise<ActionResponse<Review>> {
  return api.post<Review>("/api/reviews", data);
}

export async function getMyReviewsAction(): Promise<ActionResponse<Review[]>> {
  return api.get<Review[]>("/api/reviews/my-reviews", true);
}

export async function deleteReviewAction(
  reviewId: number
): Promise<ActionResponse> {
  return api.delete(`/api/reviews/${reviewId}`);
}

// ============ SELLER ENDPOINTS ============

export async function respondToReviewAction(
  reviewId: number,
  data: RespondToReviewDto
): Promise<ActionResponse<Review>> {
  return api.put<Review>(`/api/reviews/${reviewId}/respond`, data);
}
