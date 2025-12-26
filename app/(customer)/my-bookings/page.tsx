"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getMyBookingsAction, cancelBookingAction } from "@/actions/bookings";
import { Booking } from "@/types";
import BookingCard from "@/components/booking/BookingCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Tabs } from "@/components/ui/Tabs";
import { Calendar, CheckCircle, XCircle, List } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";

export default function MyBookingsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const result = await getMyBookingsAction();

    if (result.success && result.data) {
      setBookings(result.data);
    } else {
      showToast(result.error || "Failed to load bookings", "error");
    }

    setLoading(false);
  };

  const handleCancelBooking = async (bookingId: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    const result = await cancelBookingAction(bookingId);

    if (result.success) {
      showToast("Booking cancelled successfully", "success");
      loadBookings(); // Reload bookings
    } else {
      showToast(result.error || "Failed to cancel booking", "error");
    }
  };

  const handleReviewBooking = (bookingId: number) => {
    router.push(`/my-reviews?booking=${bookingId}`);
  };

  const filterBookings = (status?: string) => {
    if (!status || status === "all") return bookings;

    if (status === "upcoming") {
      const now = new Date();
      return bookings.filter(
        (b) => b.status === "CONFIRMED" && new Date(b.checkInDate) > now
      );
    }

    if (status === "past") {
      const now = new Date();
      return bookings.filter(
        (b) => b.status === "COMPLETED" || new Date(b.checkOutDate) < now
      );
    }

    if (status === "cancelled") {
      return bookings.filter((b) => b.status === "CANCELLED");
    }

    return bookings;
  };

  const filteredBookings = filterBookings(activeTab);

  const tabs = [
    { id: "all", label: "All Bookings", icon: <List className="h-4 w-4" /> },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: <Calendar className="h-4 w-4" />,
    },
    { id: "past", label: "Past", icon: <CheckCircle className="h-4 w-4" /> },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: <XCircle className="h-4 w-4" />,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your hotel reservations
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-neutral-200">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "border-primary-600 text-primary-600 font-semibold"
                    : "border-transparent text-muted-foreground hover:text-neutral-900"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredBookings.length === 0 && (
        <div className="card-base p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-10 w-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-6">
              {activeTab === "all"
                ? "You haven't made any bookings yet. Start exploring hotels!"
                : `No ${activeTab} bookings at this time.`}
            </p>
            <button
              onClick={() => router.push("/hotels")}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Explore Hotels →
            </button>
          </div>
        </div>
      )}

      {/* Bookings Grid */}
      {!loading && filteredBookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancelBooking}
              onReview={handleReviewBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
}
