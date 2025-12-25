import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getMyReviewsAction } from "@/actions/reviews";
import ReviewCard from "@/components/ReviewCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default async function MyReviewsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const result = await getMyReviewsAction();

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/my-bookings">
            <Button variant="ghost" size="sm" icon={<ArrowLeft />}>
              Back to Bookings
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-neutral-900 mt-4 mb-2">
            My Reviews
          </h1>
          <p className="text-neutral-600">
            Reviews you've written for your stays
          </p>
        </div>

        {/* Content */}
        {result.success && result.data ? (
          result.data.length > 0 ? (
            <div className="grid gap-6">
              {result.data.map((review) => (
                <div key={review.id}>
                  {/* Hotel Info */}
                  <div className="mb-3">
                    {review.hotel ? (
                      <Link
                        href={`/hotels/${review.hotel.id}`}
                        className="text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {review.hotel.name}
                      </Link>
                    ) : (
                      <span className="text-lg font-semibold text-gray-700">
                        {review.hotelName || "Unknown Hotel"}
                      </span>
                    )}
                    <p className="text-sm text-neutral-500">
                      {review.hotel?.city || review.hotelCity}
                    </p>
                  </div>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-soft">
              <p className="text-neutral-600 mb-4">
                You haven't written any reviews yet
              </p>
              <Link href="/my-bookings">
                <Button variant="primary">View Bookings</Button>
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
