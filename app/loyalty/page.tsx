"use client";

import { useState, useEffect, useCallback } from "react";
import { Gift, TrendingUp } from "lucide-react";
import {
  getLoyaltyPointsAction,
  redeemLoyaltyPointsAction,
} from "@/actions/promotions";
import { useToast } from "@/hooks/useToast";
import Button from "@/components/ui/Button";
import { LoyaltyPoints } from "@/types";

export default function LoyaltyPointsPage() {
  const { showToast } = useToast();
  const [points, setPoints] = useState<LoyaltyPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [redeeming, setRedeeming] = useState(false);

  const loadPoints = useCallback(async () => {
    setLoading(true);
    const result = await getLoyaltyPointsAction();

    if (result.success && result.data) {
      setPoints(result.data);
    } else {
      showToast(result.error || "Failed to load points", "error");
    }

    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadPoints();
  }, [loadPoints]);

  const handleRedeem = async () => {
    if (!redeemAmount || redeemAmount <= 0) {
      showToast("Please enter a valid amount", "error");
      return;
    }

    if (!points || redeemAmount > points.availablePoints) {
      showToast("Insufficient points", "error");
      return;
    }

    setRedeeming(true);
    const result = await redeemLoyaltyPointsAction(redeemAmount);

    if (result.success) {
      showToast(`Redeemed ${redeemAmount} points!`, "success");
      setRedeemAmount(0);
      loadPoints();
    } else {
      showToast(result.error || "Failed to redeem points", "error");
    }

    setRedeeming(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Loyalty Points</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Points Balance */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Your Points</h2>
              </div>
              <p className="text-5xl font-bold mb-2">
                {points?.availablePoints || 0}
              </p>
              <p className="text-white/80">
                Worth ${points?.pointsValue?.toFixed(2) || "0.00"} in discounts
              </p>
            </div>

            {/* Redeem Section */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-bold mb-4">Redeem Points</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={redeemAmount || ""}
                  onChange={(e) => setRedeemAmount(Number(e.target.value))}
                  placeholder="Enter points to redeem"
                  className="flex-1 px-4 py-3 border rounded-lg"
                  max={points?.availablePoints || 0}
                />
                <Button
                  onClick={handleRedeem}
                  disabled={redeeming || !redeemAmount}
                  icon={<TrendingUp className="h-5 w-5" />}
                >
                  {redeeming ? "Redeeming..." : "Redeem"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                1 point = $0.01 discount
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-bold mb-4">How It Works</h3>
              <ul className="space-y-2 text-neutral-700">
                <li>• Earn 1 point for every $1 spent on bookings</li>
                <li>
                  • Redeem points on your next booking for instant savings
                </li>
                <li>• Points never expire!</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
