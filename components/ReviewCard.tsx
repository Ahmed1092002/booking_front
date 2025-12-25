"use client";

import { Review } from "@/types";
import { Star } from "lucide-react";
import { format } from "date-fns";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
      {/* Rating and Date */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-lg font-semibold text-neutral-900">
            {review.rating}.0
          </span>
        </div>
        <span className="text-sm text-neutral-500">
          {format(new Date(review.createdAt), "MMM dd, yyyy")}
        </span>
      </div>

      {/* Reviewer Info */}
      <div className="mb-3">
        <p className="font-semibold text-neutral-900">
          {review.user?.fullName || review.reviewerName || "Anonymous"}
        </p>
      </div>

      {/* Comment */}
      <p className="text-neutral-700 leading-relaxed mb-4">{review.comment}</p>

      {/* Seller Response */}
      {review.sellerResponse && (
        <div className="mt-4 pt-4 border-t border-neutral-200 bg-neutral-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
          <p className="text-sm font-semibold text-neutral-900 mb-2">
            Seller Response:
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {review.sellerResponse}
          </p>
        </div>
      )}
    </div>
  );
}
