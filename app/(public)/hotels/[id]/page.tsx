import { notFound } from "next/navigation";
import { getHotelByIdAction, getHotelRoomsAction } from "@/actions/hotels";
import { getReviewsByHotelIdAction } from "@/actions/reviews";
import HotelGallery from "@/components/hotel/HotelGallery";
import AmenitiesList from "@/components/hotel/AmenitiesList";
import RoomCard from "@/components/hotel/RoomCard";
import ReviewCard from "@/components/review/ReviewCard";
import StarRating from "@/components/review/StarRating";
import { MapPin, Star } from "lucide-react";

interface HotelDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelDetailsPage({
  params,
}: HotelDetailsPageProps) {
  const { id } = await params;
  const hotelId = parseInt(id);

  if (isNaN(hotelId)) {
    notFound();
  }

  // Fetch hotel details, rooms, and reviews in parallel
  const [hotelResult, roomsResult, reviewsResult] = await Promise.all([
    getHotelByIdAction(hotelId),
    getHotelRoomsAction(hotelId),
    getReviewsByHotelIdAction(hotelId),
  ]);

  if (!hotelResult.success || !hotelResult.data) {
    notFound();
  }

  const hotel = hotelResult.data;
  // Use rooms from specific endpoint if available, otherwise fall back to hotel.rooms
  const rooms =
    roomsResult.success && roomsResult.data
      ? roomsResult.data
      : hotel.rooms || [];

  hotel.rooms = rooms;

  const reviews =
    reviewsResult.success && reviewsResult.data ? reviewsResult.data : [];

  const averageRating = hotel.averageRating || 0;
  const reviewCount =
    hotel.reviewCount || hotel.totalReviews || reviews.length || 0;

  return (
    <div className="bg-background min-h-screen">
      {/* Gallery */}
      <HotelGallery images={hotel.images || []} hotelName={hotel.name} />

      {/* Hotel Info Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {hotel.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={averageRating} size="sm" showValue />
                  <span className="text-sm text-muted-foreground">
                    ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {hotel.city}, {hotel.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="card-base p-6">
              <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
              <p className="text-neutral-700 leading-relaxed">
                {hotel.name} is located in {hotel.city}. This property offers
                comfortable accommodations with modern amenities for your stay.
              </p>
            </section>

            {/* Amenities */}
            <section className="card-base p-6">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <AmenitiesList amenities={hotel.amenities} variant="grid" />
            </section>

            {/* Location */}
            {hotel.googleMapUrl && (
              <section className="card-base p-6">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  {hotel.address}, {hotel.city}
                </p>
                <a
                  href={hotel.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View on Google Maps →
                </a>
              </section>
            )}

            {/* Available Rooms */}
            {hotel.rooms && hotel.rooms.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
                <div className="space-y-4">
                  {hotel.rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      hotelId={hotel.id}
                      hotelName={hotel.name}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Guest Reviews</h2>
                {reviewCount > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-warning text-warning" />
                      <span className="text-2xl font-bold">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground">/ 5.0</span>
                  </div>
                )}
              </div>

              {reviews.length === 0 ? (
                <div className="card-base p-8 text-center">
                  <p className="text-muted-foreground">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              ) : (
                <div className="card-base p-6 space-y-6">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Booking */}
          <div className="lg:col-span-1">
            <div className="card-base p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Book Your Stay</h3>

              {hotel.rooms && hotel.rooms.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Starting from
                    </p>
                    <p className="text-3xl font-bold text-primary-600">
                      ${hotel.minRoomPrice || hotel.rooms[0].pricePerNight}
                      <span className="text-sm font-normal text-muted-foreground">
                        /night
                      </span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {hotel.availableRooms ||
                        hotel.rooms.filter((r) => r.isAvailable || r.available)
                          .length}{" "}
                      rooms available
                    </p>
                    <p className="text-sm text-neutral-700">
                      Select a room above to view booking details and complete
                      your reservation.
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">
                  No rooms available at this time.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
