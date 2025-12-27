"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Send } from "lucide-react";
import { getMyReviewsAction, respondToReviewAction } from "@/actions/reviews";
import { useToast } from "@/hooks/useToast";
import Button from "@/components/ui/Button";
import { Review } from "@/types";

export default function SellerReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [respondingTo, setRespondingTo] = useState<number | null>(null);
  const [response, setResponse] = useState("");

  const loadReviews = useCallback(async () => {
    setLoading(true);
    const result = await getMyReviewsAction();

    if (result.success && result.data) {
      setReviews(result.data);
    } else {
      showToast(result.error || "Failed to load reviews", "error");
    }

    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadReviews();
  }, [loadReviews]);

  const handleRespond = async (reviewId: number) => {
    if (!response.trim()) {
      showToast("Please enter a response", "error");
      return;
    }

    const result = await respondToReviewAction(reviewId, { response });

    if (result.success) {
      showToast("Response posted!", "success");
      setResponse("");
      setRespondingTo(null);
      loadReviews();
    } else {
      showToast(result.error || "Failed to post response", "error");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Reviews</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
            <p className="text-muted-foreground">No reviews yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 shadow-soft"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold">{review.hotelName}</h3>
                    <p className="text-sm text-muted-foreground">
                      By {review.reviewerName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating
                            ? "text-warning"
                            : "text-neutral-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-neutral-700 mb-4">{review.comment}</p>

                {review.sellerResponse ? (
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Your Response:</p>
                    <p className="text-neutral-700">{review.sellerResponse}</p>
                  </div>
                ) : respondingTo === review.id ? (
                  <div className="border-t pt-4">
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Write your response..."
                      className="w-full px-4 py-3 border rounded-lg mb-2"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setRespondingTo(null);
                          setResponse("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        icon={<Send className="h-4 w-4" />}
                        onClick={() => handleRespond(review.id)}
                      >
                        Post Response
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRespondingTo(review.id)}
                  >
                    Respond
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
