import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getSellerHotelsAction } from "@/actions/hotels";
import Link from "next/link";
import { Plus, Building2, Star, DollarSign } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default async function SellerHotelsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.roles.includes("ROLE_SELLER")) {
    redirect("/");
  }

  const result = await getSellerHotelsAction();

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">
              My Hotels
            </h1>
            <p className="text-neutral-600">
              Manage your hotels and properties
            </p>
          </div>
          <Link href="/seller/hotels/new">
            <Button variant="primary" size="lg" icon={<Plus />}>
              Add New Hotel
            </Button>
          </Link>
        </div>

        {/* Content */}
        {result.success && result.data ? (
          result.data.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.data.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 group"
                >
                  {/* Hotel Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden">
                    {hotel.images && hotel.images.length > 0 ? (
                      <img
                        src={
                          hotel.images.find((img) => img.isPrimary)?.imageUrl ||
                          hotel.images[0].imageUrl
                        }
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                  </div>

                  {/* Hotel Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-1">
                          {hotel.name}
                        </h3>
                        <p className="text-sm text-neutral-500">{hotel.city}</p>
                      </div>
                      {hotel.averageRating && (
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-semibold">
                            {hotel.averageRating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <Badge key={idx} variant="info">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <Badge variant="info">
                          +{hotel.amenities.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/seller/hotels/${hotel.id}`}
                        className="flex-1"
                      >
                        <Button variant="primary" size="sm" className="w-full">
                          Manage
                        </Button>
                      </Link>
                      <Link href={`/seller/hotels/${hotel.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                No hotels yet
              </h2>
              <p className="text-neutral-600 mb-6">
                Get started by adding your first hotel
              </p>
              <Link href="/seller/hotels/new">
                <Button variant="primary" size="lg" icon={<Plus />}>
                  Add Your First Hotel
                </Button>
              </Link>
            </div>
          )
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-600">{result.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
