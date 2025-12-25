import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getLoyaltyPointsAction } from "@/actions/promotions";
import { Coins, TrendingUp } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default async function LoyaltyPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const result = await getLoyaltyPointsAction();

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-600">
              {result.error || "Failed to load points"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const points = result.data;
  const pointsToMoneyRatio = 100; // 100 points = $10

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Loyalty Points
          </h1>
          <p className="text-neutral-600">
            Earn points with every booking and redeem them for discounts
          </p>
        </div>

        {/* Points Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Total Points */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white shadow-soft-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold">Total Points</h2>
            </div>
            <p className="text-5xl font-bold mb-2">{points.totalPoints}</p>
            <p className="text-white/80">All-time earned points</p>
          </div>

          {/* Available Points */}
          <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-8 text-white shadow-soft-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold">Available Points</h2>
            </div>
            <p className="text-5xl font-bold mb-2">{points.availablePoints}</p>
            <p className="text-white/80">
              Worth $
              {((points.availablePoints / pointsToMoneyRatio) * 10).toFixed(2)}
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 shadow-soft">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            How Loyalty Points Work
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  Earn Points
                </h3>
                <p className="text-neutral-600">
                  Earn 10 points for every dollar spent on bookings
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  Redeem Points
                </h3>
                <p className="text-neutral-600">
                  Use {pointsToMoneyRatio} points to get $10 off your next
                  booking
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  Save Money
                </h3>
                <p className="text-neutral-600">
                  Apply points at checkout for instant discounts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Points Value Calculator */}
        <div className="mt-8 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Points Value</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary-400">
                {pointsToMoneyRatio}
              </p>
              <p className="text-white/60 mt-2">Points = $10</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary-400">
                {pointsToMoneyRatio * 5}
              </p>
              <p className="text-white/60 mt-2">Points = $50</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary-400">
                {pointsToMoneyRatio * 10}
              </p>
              <p className="text-white/60 mt-2">Points = $100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
