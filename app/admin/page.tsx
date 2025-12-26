"use client";

import { useState, useEffect } from "react";
import { getStatisticsAction } from "@/actions/admin";
import { SystemStatistics } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Users,
  Hotel,
  DollarSign,
  TrendingUp,
  Calendar,
  Star,
  Tag,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";

export default function AdminDashboard() {
  const { showToast } = useToast();
  const [stats, setStats] = useState<SystemStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    setLoading(true);
    const result = await getStatisticsAction();

    if (result.success && result.data) {
      setStats(result.data);
    } else {
      showToast(result.error || "Failed to load statistics", "error");
    }

    setLoading(false);
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
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-50 rounded-lg">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats?.totalUsers || 0}</h3>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>

        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-secondary-50 rounded-lg">
              <Hotel className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats?.totalHotels || 0}</h3>
          <p className="text-sm text-muted-foreground">Total Hotels</p>
        </div>

        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <Calendar className="h-6 w-6 text-success" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">
            {stats?.totalBookings || 0}
          </h3>
          <p className="text-sm text-muted-foreground">Total Bookings</p>
        </div>

        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-warning" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">
            ${stats?.totalRevenue?.toLocaleString() || 0}
          </h3>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-base p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/admin/users">
            <div className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
              <Users className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="font-semibold mb-1">Manage Users</h3>
              <p className="text-sm text-muted-foreground">
                View and manage all users
              </p>
            </div>
          </Link>

          <Link href="/admin/discounts">
            <div className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
              <Tag className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="font-semibold mb-1">Discounts</h3>
              <p className="text-sm text-muted-foreground">
                Manage discount codes
              </p>
            </div>
          </Link>

          <Link href="/admin/audit-logs">
            <div className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
              <Shield className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="font-semibold mb-1">Audit Logs</h3>
              <p className="text-sm text-muted-foreground">
                View system activity
              </p>
            </div>
          </Link>

          <div className="p-4 border-2 border-neutral-200 rounded-lg opacity-50">
            <Star className="h-8 w-8 text-neutral-400 mb-2" />
            <h3 className="font-semibold mb-1">Reviews</h3>
            <p className="text-sm text-muted-foreground">Monitor all reviews</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-base p-6">
        <h2 className="text-xl font-bold mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span className="font-semibold text-success">Operational</span>
            </div>
            <p className="text-sm text-muted-foreground">
              All systems running smoothly
            </p>
          </div>

          <div className="p-4 bg-neutral-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-neutral-600" />
              <span className="font-semibold">Last 24 Hours</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {stats?.totalBookings || 0} new bookings
            </p>
          </div>

          <div className="p-4 bg-neutral-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-neutral-600" />
              <span className="font-semibold">Active Users</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {stats?.totalUsers || 0} registered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
