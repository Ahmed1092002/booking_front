"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { getHotelByIdAction } from "@/actions/hotels";
import { getHotelReviewsAction } from "@/actions/reviews";
import { Hotel, Room, Review } from "@/types";
import RoomCard from "@/components/RoomCard";
import ReviewCard from "@/components/ReviewCard";
import BookingModal from "@/components/BookingModal";
import Button from "@/components/ui/Button";

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    loadHotel();
  }, [params.id]);

  const loadHotel = async () => {
    setLoading(true);
    const hotelId = Number(params.id);
    const [hotelResult, reviewsResult] = await Promise.all([
      getHotelByIdAction(hotelId),
      getHotelReviewsAction(hotelId),
    ]);

    if (hotelResult.success && hotelResult.data) {
      setHotel(hotelResult.data);
    }
    if (reviewsResult.success && reviewsResult.data) {
      setReviews(reviewsResult.data);
    }
    setLoading(false);
  };

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass rounded-2xl h-96 animate-pulse" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-2xl text-white">Hotel not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        icon={<ArrowLeft />}
        className="mb-6"
      >
        Back to Hotels
      </Button>

      <div className="glass rounded-2xl p-8 mb-8">
        {/* Hotel Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-3">{hotel.name}</h1>
          <div className="flex items-center gap-2 text-gray-200 mb-4">
            <MapPin className="w-5 h-5" />
            <span>
              {hotel.city}, {hotel.address}
            </span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 mb-4">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-lg font-semibold">4.5</span>
            <span className="text-gray-300 ml-2">(128 reviews)</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.map((amenity, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 rounded-full text-white"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Google Maps */}
        {hotel.googleMapUrl && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Location</h2>
            <div className="rounded-lg overflow-hidden h-64 bg-white/10">
              <iframe
                src={hotel.googleMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Seller Info */}
        <div className="text-gray-300">
          <p>
            Managed by{" "}
            <span className="font-semibold text-white">
              {hotel.seller?.fullName || hotel.sellerName || "Unknown Seller"}
            </span>
          </p>
        </div>
      </div>

      {/* Rooms Section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Available Rooms</h2>
        {hotel.rooms && hotel.rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onBook={() => handleBookRoom(room)}
              />
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-xl text-white">
              No rooms available at this hotel
            </p>
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mt-12 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Guest Reviews</h2>
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-xl text-white">No reviews yet</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onSuccess={() => router.push("/my-bookings")}
        />
      )}
    </div>
  );
}
