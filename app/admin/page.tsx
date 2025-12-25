import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getStatisticsAction } from "@/actions/admin";
import { Users, Building2, Calendar, DollarSign, Tag } from "lucide-react";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.roles.includes("ROLE_ADMIN")) {
    redirect("/");
  }

  const result = await getStatisticsAction();

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-600">
              {result.error || "Failed to load statistics"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const stats = result.data;

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Hotels",
      value: stats.totalHotels,
      icon: Building2,
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-yellow-500 to-yellow-600",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Active Discount Codes",
      value: stats.activeDiscountCodes,
      icon: Tag,
      color: "from-red-500 to-red-600",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-neutral-600">System overview and statistics</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl p-8 shadow-soft">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/admin/users"
              className="p-6 border-2 border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 group"
            >
              <Users className="w-8 h-8 text-neutral-600 group-hover:text-primary-600 mb-3 transition-colors" />
              <h3 className="font-semibold text-neutral-900 mb-1">
                Manage Users
              </h3>
              <p className="text-sm text-neutral-600">
                View and manage all users
              </p>
            </a>

            <a
              href="/admin/discounts"
              className="p-6 border-2 border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 group"
            >
              <Tag className="w-8 h-8 text-neutral-600 group-hover:text-primary-600 mb-3 transition-colors" />
              <h3 className="font-semibold text-neutral-900 mb-1">
                Discount Codes
              </h3>
              <p className="text-sm text-neutral-600">
                Create and manage discounts
              </p>
            </a>

            <a
              href="/admin/audit-logs"
              className="p-6 border-2 border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 group"
            >
              <Calendar className="w-8 h-8 text-neutral-600 group-hover:text-primary-600 mb-3 transition-colors" />
              <h3 className="font-semibold text-neutral-900 mb-1">
                Audit Logs
              </h3>
              <p className="text-sm text-neutral-600">
                View system activity logs
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
