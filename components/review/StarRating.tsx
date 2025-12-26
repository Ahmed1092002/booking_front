import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  className,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={cn(sizeClasses[size], "fill-warning text-warning")}
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className={cn(sizeClasses[size], "text-neutral-300")} />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <Star
              className={cn(sizeClasses[size], "fill-warning text-warning")}
            />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={cn(sizeClasses[size], "text-neutral-300")}
        />
      ))}

      {/* Rating value */}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-neutral-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
