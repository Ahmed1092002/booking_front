"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { createReviewAction } from "@/actions/reviews";
import { CreateReviewDto } from "@/types";

interface ReviewFormProps {
  bookingId: number;
  onSuccess?: () => void;
}

export default function ReviewForm({ bookingId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Please write a comment");
      return;
    }

    setLoading(true);
    setError(null);

    const data: CreateReviewDto = {
      bookingId,
      rating,
      comment: comment.trim(),
    };

    const result = await createReviewAction(data);

    if (result.success) {
      setComment("");
      setRating(5);
      onSuccess?.();
    } else {
      setError(result.error || "Failed to submit review");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating Selector */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-2">
          Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none transform transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                } transition-colors duration-150`}
              />
            </button>
          ))}
          <span className="ml-2 text-lg font-semibold text-neutral-900">
            {rating}.0
          </span>
        </div>
      </div>

      {/* Comment */}
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-neutral-900 mb-2"
        >
          Your Review
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          maxLength={500}
          rows={5}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
          required
        />
        <p className="mt-1 text-sm text-neutral-500 text-right">
          {comment.length}/500 characters
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
