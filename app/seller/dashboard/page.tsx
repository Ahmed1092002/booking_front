import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getSellerHotelsAction } from "@/actions/hotels";
import Link from "next/link";
import { Building2, Plus, Calendar, Star } from "lucide-react";
import Button from "@/components/ui/Button";

export default async function SellerDashboardPage() {
  const user = await getCurrentUser();
  if (!user || !user.roles.includes("ROLE_SELLER")) {
    redirect("/");
  }

  const result = await getSellerHotelsAction();
  const hotels = result.data || [];

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">
              Seller Dashboard
            </h1>
            <p className="text-neutral-600">Welcome back, {user.fullName}</p>
          </div>
          <Link href="/seller/hotels/new">
            <Button variant="primary" icon={<Plus />}>
              Add New Hotel
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Hotels</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {hotels.length}
                </p>
              </div>
            </div>
          </div>
          {/* Add more stats if API supports it (e.g. Total Bookings, Revenue) */}
        </div>

        {/* Recent Hotels */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900">Your Hotels</h2>
            <Link
              href="/seller/hotels"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {hotels.slice(0, 5).map((hotel) => (
              <div
                key={hotel.id}
                className="p-6 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-neutral-200 overflow-hidden relative">
                      {hotel.images && hotel.images.length > 0 ? (
                        <img
                          src={hotel.images[0].imageUrl}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-neutral-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-neutral-500">{hotel.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href={`/seller/hotels/${hotel.id}`}>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {hotels.length === 0 && (
              <div className="p-12 text-center text-neutral-500">
                You haven't added any hotels yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
