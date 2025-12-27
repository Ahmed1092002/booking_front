"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createReviewAction, deleteReviewAction } from "@/actions/reviews";
import { getMyBookingsAction } from "@/actions/bookings";
import { Booking, Review, CreateReviewDto } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import ReviewCard from "@/components/review/ReviewCard";
import Dialog from "@/components/ui/Dialog";
import { Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/useToast";

function MyReviewsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadBookings();

    // Check if we should open review dialog from query param
    const bookingId = searchParams.get("booking");
    if (bookingId) {
      // Will open dialog after bookings load
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const bookingId = searchParams.get("booking");
    if (bookingId && bookings.length > 0) {
      const booking = bookings.find((b) => b.id === parseInt(bookingId));
      if (booking && booking.canReview) {
        handleOpenReviewDialog(booking);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  const loadBookings = async () => {
    setLoading(true);
    const result = await getMyBookingsAction();

    if (result.success && result.data) {
      // Filter to show only completed bookings
      const completedBookings = result.data.filter(
        (b) => b.status === "COMPLETED"
      );
      setBookings(completedBookings);
    } else {
      showToast(result.error || "Failed to load bookings", "error");
    }

    setLoading(false);
  };

  const handleOpenReviewDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setRating(5);
    setComment("");
    setShowReviewDialog(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedBooking) return;

    if (comment.trim().length < 10) {
      showToast("Please write a review of at least 10 characters", "error");
      return;
    }

    setSubmitting(true);

    const reviewData: CreateReviewDto = {
      bookingId: selectedBooking.id,
      rating,
      comment: comment.trim(),
    };

    const result = await createReviewAction(reviewData);

    if (result.success) {
      showToast("Review submitted successfully!", "success");
      setShowReviewDialog(false);
      loadBookings(); // Reload to update canReview status
    } else {
      showToast(result.error || "Failed to submit review", "error");
    }

    setSubmitting(false);
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm("Are you sure you want to delete this review?")) {
      return;
    }

    const result = await deleteReviewAction(reviewId);

    if (result.success) {
      showToast("Review deleted successfully", "success");
      loadBookings();
    } else {
      showToast(result.error || "Failed to delete review", "error");
    }
  };

  // Mock reviews - in real app, would fetch from API
  const reviews: Review[] = [];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
        <p className="text-muted-foreground">
          Share your experiences and help other travelers
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Bookings awaiting review */}
      {!loading && bookings.some((b) => b.canReview) && (
        <div className="card-base p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Pending Reviews</h2>
          <div className="space-y-4">
            {bookings
              .filter((b) => b.canReview)
              .map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{booking.hotelName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {booking.hotelCity} • {booking.roomName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Checked out:{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleOpenReviewDialog(booking)}
                    icon={<Star className="h-4 w-4" />}
                  >
                    Write Review
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Existing Reviews */}
      {!loading && reviews.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                canDelete
                onDelete={handleDeleteReview}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading &&
        reviews.length === 0 &&
        !bookings.some((b) => b.canReview) && (
          <div className="card-base p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-10 w-10 text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
              <p className="text-muted-foreground mb-6">
                Complete a booking to leave your first review!
              </p>
              <Button onClick={() => router.push("/hotels")}>
                Explore Hotels
              </Button>
            </div>
          </div>
        )}

      {/* Review Dialog */}
      {showReviewDialog && selectedBooking && (
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Write a Review</h2>

            <div className="mb-4">
              <p className="font-semibold">{selectedBooking.hotelName}</p>
              <p className="text-sm text-muted-foreground">
                {selectedBooking.hotelCity}
              </p>
            </div>

            <div className="mb-4">
              <Label>Rating</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setRating(value)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        value <= rating
                          ? "fill-warning text-warning"
                          : "text-neutral-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="comment">Your Review</Label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                rows={5}
                className="w-full mt-1 px-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 10 characters
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSubmitReview}
                disabled={submitting || comment.trim().length < 10}
                className="flex-1"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowReviewDialog(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default function MyReviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-8">
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      }
    >
      <MyReviewsContent />
    </Suspense>
  );
}
