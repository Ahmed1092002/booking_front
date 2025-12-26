"use server";

import { api } from "@/lib/api-client";
import { ActionResponse, DiscountValidation, LoyaltyPoints } from "@/types";

// ============ PUBLIC ENDPOINTS ============

export async function validateDiscountCodeAction(
  code: string,
  amount: number
): Promise<ActionResponse<DiscountValidation>> {
  return api.post<DiscountValidation>(
    `/api/promotions/validate-code?code=${encodeURIComponent(
      code
    )}&amount=${amount}`,
    {},
    false
  );
}

// ============ PROTECTED ENDPOINTS ============

export async function getLoyaltyPointsAction(): Promise<
  ActionResponse<LoyaltyPoints>
> {
  return api.get<LoyaltyPoints>("/api/promotions/loyalty-points", true);
}

export async function redeemLoyaltyPointsAction(
  points: number
): Promise<ActionResponse<LoyaltyPoints>> {
  return api.post<LoyaltyPoints>(
    `/api/promotions/loyalty-points/redeem?points=${points}`,
    {}
  );
}

// Alias for consistency
export const redeemPointsAction = redeemLoyaltyPointsAction;
