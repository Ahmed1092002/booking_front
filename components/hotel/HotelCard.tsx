import Link from "next/link";
import { MapPin } from "lucide-react";
import { Hotel } from "@/types";
import StarRating from "@/components/review/StarRating";
import AmenitiesList from "./AmenitiesList";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface HotelCardProps {
  hotel: Hotel;
  variant?: "grid" | "list";
  className?: string;
}

export default function HotelCard({
  hotel,
  variant = "grid",
  className,
}: HotelCardProps) {
  const primaryImage = hotel.images?.find((img) => img.isPrimary);
  const fallbackImage = hotel.images?.[0];
  const imageUrl = primaryImage?.imageUrl || fallbackImage?.imageUrl;

  const minPrice = hotel.minRoomPrice || hotel.rooms?.[0]?.pricePerNight || 0;

  if (variant === "list") {
    return (
      <div
        className={cn(
          "card-base overflow-hidden hover:shadow-md transition-shadow duration-300",
          className
        )}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image */}
          <Link
            href={`/hotels/${hotel.id}`}
            className="relative w-full md:w-64 h-48 md:h-auto bg-neutral-200 overflow-hidden group flex-shrink-0"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                No Image
              </div>
            )}
          </Link>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <Link href={`/hotels/${hotel.id}`}>
                <h3 className="text-xl font-bold mb-2 hover:text-primary-600 transition-colors">
                  {hotel.name}
                </h3>
              </Link>

              <div className="flex items-center gap-2 mb-3">
                <StarRating
                  rating={hotel.averageRating || 0}
                  size="sm"
                  showValue
                />
                <span className="text-sm text-muted-foreground">
                  ({hotel.reviewCount || hotel.totalReviews || 0} reviews)
                </span>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{hotel.city}</span>
              </div>

              <AmenitiesList
                amenities={hotel.amenities}
                maxDisplay={4}
                variant="inline"
              />
            </div>

            <div className="flex items-end justify-between mt-4">
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="text-2xl font-bold text-primary-600">
                  ${minPrice}
                  <span className="text-sm font-normal text-muted-foreground">
                    /night
                  </span>
                </p>
              </div>
              <Link href={`/hotels/${hotel.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "card-base overflow-hidden hover:shadow-md transition-shadow duration-300 group",
        className
      )}
    >
      {/* Image */}
      <Link
        href={`/hotels/${hotel.id}`}
        className="relative w-full h-48 bg-neutral-200 overflow-hidden block"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            No Image
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/hotels/${hotel.id}`}>
          <h3 className="text-lg font-bold mb-2 hover:text-primary-600 transition-colors line-clamp-1">
            {hotel.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={hotel.averageRating || 0} size="sm" showValue />
          <span className="text-xs text-muted-foreground">
            ({hotel.reviewCount || hotel.totalReviews || 0})
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{hotel.city}</span>
        </div>

        <AmenitiesList
          amenities={hotel.amenities}
          maxDisplay={3}
          variant="inline"
          className="mb-4"
        />

        <div className="flex items-end justify-between pt-3 border-t border-neutral-200">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-xl font-bold text-primary-600">
              ${minPrice}
              <span className="text-xs font-normal text-muted-foreground">
                /night
              </span>
            </p>
          </div>
          <Link href={`/hotels/${hotel.id}`}>
            <Button size="sm">View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
