"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, DollarSign } from "lucide-react";
import { getMyBookingsAction } from "@/actions/bookings";
import { Booking } from "@/types";
import { format } from "date-fns";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const result = await getMyBookingsAction();
    if (result.success && result.data) {
      setBookings(result.data);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">My Bookings</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="glass rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {booking.room?.hotel?.name ||
                      booking.hotelName ||
                      "Unknown Hotel"}
                  </h3>
                  <p className="text-gray-200">
                    {booking.room?.name || booking.roomName}
                  </p>
                </div>
                <span
                  className={`${getStatusColor(
                    booking.status
                  )} text-white px-4 py-1.5 rounded-full text-sm font-semibold`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-primary-300" />
                  <div>
                    <p className="text-sm text-gray-300">Location</p>
                    <p className="font-semibold">
                      {booking.room?.hotel?.city || booking.hotelCity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white">
                  <Calendar className="w-5 h-5 text-primary-300" />
                  <div>
                    <p className="text-sm text-gray-300">
                      Check-in / Check-out
                    </p>
                    <p className="font-semibold">
                      {format(new Date(booking.checkInDate), "MMM dd")} -{" "}
                      {format(new Date(booking.checkOutDate), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white">
                  <DollarSign className="w-5 h-5 text-primary-300" />
                  <div>
                    <p className="text-sm text-gray-300">Total Price</p>
                    <p className="font-semibold text-xl text-primary-300">
                      ${booking.totalPrice}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-gray-300 text-sm">
                Booking ID: #{booking.id}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-xl p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            No bookings yet
          </h2>
          <p className="text-gray-300 mb-6">
            Start exploring hotels and make your first booking!
          </p>
          <a
            href="/hotels"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Browse Hotels
          </a>
        </div>
      )}
    </div>
  );
}
