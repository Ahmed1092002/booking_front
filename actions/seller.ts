"use server";

import { api } from "@/lib/api-client";
import { ActionResponse, SellerStats } from "@/types";

// ============ SELLER ENDPOINTS ============

export async function getSellerDashboardAction(): Promise<
  ActionResponse<SellerStats>
> {
  // Updated: Port 8081 has /api/hotels/seller/stats
  return api.get<SellerStats>("/api/hotels/seller/stats", true);
}
