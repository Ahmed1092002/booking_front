"use client";

import { useState, useEffect } from "react";
import { getStatisticsAction } from "@/actions/admin";
import { SystemStatistics } from "@/types";
import {
  Users,
  Hotel,
  Calendar,
  DollarSign,
  TrendingUp,
  Tag,
  Star,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<SystemStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const result = await getStatisticsAction();
      if (result.success && result.data) {
        setStats(result.data);
      }
      setLoading(false);
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="container max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-neutral-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-neutral-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-500",
      link: "/admin/users",
    },
    {
      title: "Total Hotels",
      value: stats?.totalHotels || 0,
      icon: Hotel,
      color: "bg-green-500",
      link: "/admin/hotels",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: Calendar,
      color: "bg-purple-500",
      link: "/admin/bookings",
    },
    {
      title: "Total Revenue",
      value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-emerald-500",
      link: "/admin/revenue",
    },
    {
      title: "Active Sellers",
      value: stats?.activeSellers || 0,
      icon: TrendingUp,
      color: "bg-orange-500",
      link: "/admin/users",
    },
    {
      title: "Active Discounts",
      value: stats?.activeDiscountCodes || 0,
      icon: Tag,
      color: "bg-pink-500",
      link: "/admin/discounts",
    },
    {
      title: "Avg Rating",
      value: (stats?.averageRating || 0).toFixed(1),
      icon: Star,
      color: "bg-yellow-500",
      link: "/admin/reviews",
    },
    {
      title: "Pending Reviews",
      value: stats?.pendingReviews || 0,
      icon: Activity,
      color: "bg-red-500",
      link: "/admin/reviews",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage all users",
      icon: Users,
      link: "/admin/users",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },
    {
      title: "Discount Codes",
      description: "Create and manage discount codes",
      icon: Tag,
      link: "/admin/discounts",
      color: "bg-pink-50 text-pink-600 hover:bg-pink-100",
    },
    {
      title: "Audit Logs",
      description: "View system activity logs",
      icon: Activity,
      link: "/admin/audit-logs",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your platform's performance and statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              href={stat.link}
              className="card-base p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className={`card-base p-6 ${action.color} transition-colors`}
              >
                <action.icon className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-semibold mb-1">{action.title}</h3>
                <p className="text-sm opacity-80">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-base p-6">
          <h2 className="text-2xl font-bold mb-4">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-neutral-700">
                Platform Health
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-neutral-600">Total Users</span>
                  <span className="font-semibold">
                    {stats?.totalUsers || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-neutral-600">
                    Active Sellers
                  </span>
                  <span className="font-semibold">
                    {stats?.activeSellers || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-neutral-600">Total Hotels</span>
                  <span className="font-semibold">
                    {stats?.totalHotels || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-neutral-600">
                    Total Bookings
                  </span>
                  <span className="font-semibold">
                    {stats?.totalBookings || 0}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-neutral-700">
                Revenue & Ratings
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-neutral-600">
                    Total Revenue
                  </span>
                  <span className="font-semibold text-green-600">
                    ${(stats?.totalRevenue || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-neutral-600">
                    Average Rating
                  </span>
                  <span className="font-semibold text-yellow-600">
                    {(stats?.averageRating || 0).toFixed(1)} ⭐
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-neutral-600">
                    Active Discounts
                  </span>
                  <span className="font-semibold">
                    {stats?.activeDiscountCodes || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-neutral-600">
                    Pending Reviews
                  </span>
                  <span className="font-semibold text-orange-600">
                    {stats?.pendingReviews || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
