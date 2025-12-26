import { Room } from "@/types";
import { Users, Eye, UtensilsCrossed } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  onSelect?: (roomId: number) => void;
  isSelected?: boolean;
  className?: string;
}

export default function RoomCard({
  room,
  onSelect,
  isSelected = false,
  className,
}: RoomCardProps) {
  const primaryImage = room.images?.[0];

  return (
    <div
      className={cn(
        "card-base overflow-hidden transition-all duration-300",
        isSelected && "ring-2 ring-primary-500",
        className
      )}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image */}
        <div className="relative w-full md:w-48 h-40 bg-neutral-200 overflow-hidden flex-shrink-0">
          {primaryImage ? (
            <img
              src={primaryImage.imageUrl}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-0 md:py-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">{room.name}</h3>

            <div className="flex flex-wrap items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Up to {room.capacity} guests</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{room.viewType || "Standard"} view</span>
              </div>

              {room.hasKitchen && (
                <div className="flex items-center gap-1 text-sm text-primary-600">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>Kitchen</span>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="mb-2">
              {room.isAvailable || room.available ? (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-success/10 text-success text-xs font-medium">
                  Available
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-error/10 text-error text-xs font-medium">
                  Not Available
                </span>
              )}
            </div>
          </div>

          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-sm text-muted-foreground">Price per night</p>
              <p className="text-2xl font-bold text-primary-600">
                ${room.pricePerNight}
              </p>
            </div>
            {onSelect && (room.isAvailable || room.available) && (
              <Button
                onClick={() => onSelect(room.id)}
                variant={isSelected ? "primary" : "outline"}
              >
                {isSelected ? "Selected" : "Select Room"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
