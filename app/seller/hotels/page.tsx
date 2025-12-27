"use client";

import { useState, useEffect } from "react";
import { getSellerHotelsAction, deleteHotelAction } from "@/actions/hotels";
import { Hotel } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";
import { Plus, Edit, Trash2, Hotel as HotelIcon } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";

export default function SellerHotelsPage() {
  const { showToast } = useToast();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHotels = async () => {
    setLoading(true);
    const result = await getSellerHotelsAction();

    if (result.success && result.data) {
      setHotels(result.data);
    } else {
      showToast(result.error || "Failed to load hotels", "error");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (hotelId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this hotel? This action cannot be undone."
      )
    ) {
      return;
    }

    const result = await deleteHotelAction(hotelId);

    if (result.success) {
      showToast("Hotel deleted successfully", "success");
      loadHotels();
    } else {
      showToast(result.error || "Failed to delete hotel", "error");
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Hotels</h1>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Link href="/seller/hotels/new">
          <Button icon={<Plus className="h-5 w-5" />}>Add New Hotel</Button>
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Empty State */}
      {!loading && hotels.length === 0 && (
        <div className="card-base p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HotelIcon className="h-10 w-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No hotels yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding your first property to begin accepting bookings
            </p>
            <Link href="/seller/hotels/new">
              <Button icon={<Plus className="h-5 w-5" />}>
                Add Your First Hotel
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Hotels List */}
      {!loading && hotels.length > 0 && (
        <div className="space-y-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="card-base p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {hotel.address}, {hotel.city}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Rooms
                      </p>
                      <p className="font-semibold">
                        {hotel.rooms?.length || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Rating
                      </p>
                      <p className="font-semibold">
                        {hotel.averageRating?.toFixed(1) || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Reviews
                      </p>
                      <p className="font-semibold">{hotel.reviewCount || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Min Price
                      </p>
                      <p className="font-semibold">
                        ${hotel.minRoomPrice || "N/A"}
                      </p>
                    </div>
                  </div>

                  {hotel.amenities && hotel.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.slice(0, 5).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-neutral-100 text-xs font-medium rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 5 && (
                        <span className="px-3 py-1 bg-neutral-100 text-xs font-medium rounded-full">
                          +{hotel.amenities.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Link href={`/seller/hotels/${hotel.id}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<Edit className="h-4 w-4" />}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(hotel.id)}
                    icon={<Trash2 className="h-4 w-4" />}
                    className="text-error hover:bg-error/10"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
