"use client";

import { useState, useEffect, useCallback } from "react";
import { getSellerDashboardAction } from "@/actions/seller";
import { SellerStats } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Hotel,
  DollarSign,
  Calendar,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function SellerDashboard() {
  const { showToast } = useToast();
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = useCallback(async () => {
    setLoading(true);
    const result = await getSellerDashboardAction();

    if (result.success && result.data) {
      setStats(result.data);
    } else {
      showToast(result.error || "Failed to load statistics", "error");
    }

    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your properties and track performance
          </p>
        </div>
        <Link href="/seller/hotels/new">
          <Button icon={<Hotel className="h-5 w-5" />}>Add New Hotel</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Hotels */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-50 rounded-lg">
              <Hotel className="h-6 w-6 text-primary-600" />
            </div>
            <span className="text-sm font-medium text-success flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Active
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats?.totalHotels || 0}</h3>
          <p className="text-sm text-muted-foreground">Total Hotels</p>
        </div>

        {/* Total Bookings */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-secondary-50 rounded-lg">
              <Calendar className="h-6 w-6 text-secondary-600" />
            </div>
            <span className="text-sm font-medium text-primary-600">
              This Month
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">
            {stats?.totalBookings || 0}
          </h3>
          <p className="text-sm text-muted-foreground">Total Bookings</p>
        </div>

        {/* Total Revenue */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              +12%
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">
            ${stats?.totalRevenue?.toLocaleString() || 0}
          </h3>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>

        {/* Average Rating */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <Star className="h-6 w-6 text-warning" />
            </div>
            <span className="text-sm font-medium text-warning">
              {stats?.totalReviews || 0} reviews
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">
            {stats?.averageRating?.toFixed(1) || "0.0"}
          </h3>
          <p className="text-sm text-muted-foreground">Average Rating</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-base p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/seller/hotels">
            <div className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
              <Hotel className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="font-semibold mb-1">Manage Hotels</h3>
              <p className="text-sm text-muted-foreground">
                View and edit your properties
              </p>
            </div>
          </Link>

          <Link href="/seller/hotels/new">
            <div className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
              <TrendingUp className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="font-semibold mb-1">Add Hotel</h3>
              <p className="text-sm text-muted-foreground">
                List a new property
              </p>
            </div>
          </Link>

          <Link href="/seller/bookings">
            <div className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
              <Calendar className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="font-semibold mb-1">View Bookings</h3>
              <p className="text-sm text-muted-foreground">
                Check upcoming reservations
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="card-base p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}
