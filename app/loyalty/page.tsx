"use client";

import { useState, useEffect } from "react";
import {
  getLoyaltyPointsAction,
  redeemPointsAction,
} from "@/actions/promotions";
import { LoyaltyPoints } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Gift, TrendingUp, DollarSign, Award } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default function LoyaltyPage() {
  const { showToast } = useToast();
  const [points, setPoints] = useState<LoyaltyPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);
  const [pointsToRedeem, setPointsToRedeem] = useState("");

  useEffect(() => {
    loadPoints();
  }, []);

  const loadPoints = async () => {
    setLoading(true);
    const result = await getLoyaltyPointsAction();

    if (result.success && result.data) {
      setPoints(result.data);
    } else {
      showToast(result.error || "Failed to load loyalty points", "error");
    }

    setLoading(false);
  };

  const handleRedeem = async () => {
    const pointsNum = parseInt(pointsToRedeem);

    if (!pointsNum || pointsNum <= 0) {
      showToast("Please enter a valid number of points", "error");
      return;
    }

    if (!points || pointsNum > points.availablePoints) {
      showToast("Insufficient points", "error");
      return;
    }

    setRedeeming(true);
    const result = await redeemPointsAction(pointsNum);

    if (result.success) {
      showToast(`Successfully redeemed ${pointsNum} points!`, "success");
      setPointsToRedeem("");
      loadPoints();
    } else {
      showToast(result.error || "Failed to redeem points", "error");
    }

    setRedeeming(false);
  };

  const getConvertedValue = () => {
    const pointsNum = parseInt(pointsToRedeem) || 0;
    // Assuming 100 points = $1 (adjust based on your backend logic)
    return (pointsNum / 100).toFixed(2);
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Loyalty Points</h1>
        <p className="text-muted-foreground">
          Earn and redeem points for amazing rewards
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Points Card */}
        <div className="card-base p-6 bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Total Points</h3>
          </div>
          <p className="text-4xl font-bold mb-2">{points?.totalPoints || 0}</p>
          <p className="text-white/80 text-sm">Lifetime earnings</p>
        </div>

        {/* Available Points Card */}
        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <Gift className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold">Available</h3>
          </div>
          <p className="text-4xl font-bold mb-2 text-success">
            {points?.availablePoints || 0}
          </p>
          <p className="text-muted-foreground text-sm">Ready to redeem</p>
        </div>

        {/* Points Value Card */}
        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold">Points Value</h3>
          </div>
          <p className="text-4xl font-bold mb-2 text-primary-600">
            ${points?.pointsValue.toFixed(2) || "0.00"}
          </p>
          <p className="text-muted-foreground text-sm">Current value</p>
        </div>
      </div>

      {/* Redeem Section */}
      <div className="card-base p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Redeem Points</h2>

        <div className="max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="points">Points to Redeem</Label>
              <Input
                id="points"
                type="number"
                placeholder="Enter points amount"
                value={pointsToRedeem}
                onChange={(e) => setPointsToRedeem(e.target.value)}
                min="0"
                max={points?.availablePoints || 0}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Maximum: {points?.availablePoints || 0} points
              </p>
            </div>

            <div>
              <Label>Converted Value</Label>
              <div className="flex items-center h-10 px-4 rounded-xl border border-neutral-200 bg-neutral-50">
                <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold text-primary-600">
                  {getConvertedValue()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                100 points = $1.00
              </p>
            </div>
          </div>

          <Button
            onClick={handleRedeem}
            disabled={
              redeeming || !pointsToRedeem || parseInt(pointsToRedeem) <= 0
            }
            icon={<TrendingUp className="h-5 w-5" />}
            size="lg"
          >
            {redeeming ? "Redeeming..." : "Redeem Points"}
          </Button>
        </div>
      </div>

      {/* How It Works */}
      <div className="card-base p-6">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="font-semibold mb-2">Book & Earn</h3>
            <p className="text-sm text-muted-foreground">
              Earn points with every hotel booking you make
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="font-semibold mb-2">Accumulate</h3>
            <p className="text-sm text-muted-foreground">
              Watch your points grow with each stay
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="font-semibold mb-2">Redeem</h3>
            <p className="text-sm text-muted-foreground">
              Use your points as discounts on future bookings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
