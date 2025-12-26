import { Review } from "@/types";
import StarRating from "./StarRating";
import {Avatar} from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  canDelete?: boolean;
  onDelete?: (reviewId: number) => void;
  className?: string;
}

export default function ReviewCard({
  review,
  canDelete = false,
  onDelete,
  className,
}: ReviewCardProps) {
  const reviewDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const responseDate = review.responseDate
    ? new Date(review.responseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // Generate initials for avatar
  const initials = review.reviewerName
    ? review.reviewerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div
      className={cn(
        "border-b border-neutral-200 pb-6 last:border-0",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar
          fallback={initials}
          className="h-12 w-12 text-white bg-primary-500"
        />

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-neutral-900">
                {review.reviewerName || "Anonymous"}
              </h4>
              <p className="text-sm text-muted-foreground">{reviewDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} size="sm" />
              {canDelete && onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(review.id)}
                  icon={<Trash2 className="h-4 w-4" />}
                  className="text-error hover:text-error hover:bg-error/10"
                />
              )}
            </div>
          </div>

          {/* Comment */}
          <p className="text-neutral-700 mb-4 leading-relaxed">
            {review.comment}
          </p>

          {/* Seller Response */}
          {review.sellerResponse && (
            <div className="bg-neutral-50 rounded-lg p-4 mt-4 border-l-4 border-primary-500">
              <div className="flex items-center gap-2 mb-2">
                <h5 className="font-semibold text-sm text-neutral-900">
                  Response from hotel
                </h5>
                {responseDate && (
                  <span className="text-xs text-muted-foreground">
                    {responseDate}
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {review.sellerResponse}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
