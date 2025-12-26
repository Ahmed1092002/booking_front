import {
  Wifi,
  Waves,
  Dumbbell,
  UtensilsCrossed,
  Car,
  Sparkles,
  Wind,
  Tv,
  Coffee,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AmenitiesListProps {
  amenities: string[];
  maxDisplay?: number;
  variant?: "grid" | "inline";
  className?: string;
}

// Map amenity names to icons
const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Pool: Waves,
  Gym: Dumbbell,
  Restaurant: UtensilsCrossed,
  Parking: Car,
  Spa: Sparkles,
  "Air Conditioning": Wind,
  TV: Tv,
  "Room Service": Coffee,
  Security: Shield,
};

// Get icon for amenity (case-insensitive)
function getAmenityIcon(amenity: string): React.ElementType {
  const key = Object.keys(amenityIcons).find(
    (k) => k.toLowerCase() === amenity.toLowerCase()
  );
  return key ? amenityIcons[key] : Sparkles; // Default icon
}

export default function AmenitiesList({
  amenities,
  maxDisplay,
  variant = "grid",
  className,
}: AmenitiesListProps) {
  const displayAmenities = maxDisplay
    ? amenities.slice(0, maxDisplay)
    : amenities;
  const remainingCount = maxDisplay
    ? Math.max(0, amenities.length - maxDisplay)
    : 0;

  if (amenities.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No amenities listed
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        {displayAmenities.map((amenity, index) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <div
              key={index}
              className="flex items-center gap-1 text-sm text-muted-foreground"
            >
              <Icon className="h-4 w-4 text-primary-600" />
              <span>{amenity}</span>
            </div>
          );
        })}
        {remainingCount > 0 && (
          <span className="text-sm text-muted-foreground">
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {displayAmenities.map((amenity, index) => {
        const Icon = getAmenityIcon(amenity);
        return (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-neutral-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
              <Icon className="h-4 w-4 text-primary-600" />
            </div>
            <span>{amenity}</span>
          </div>
        );
      })}
      {remainingCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
            <Sparkles className="h-4 w-4 text-neutral-500" />
          </div>
          <span>+{remainingCount} more</span>
        </div>
      )}
    </div>
  );
}
