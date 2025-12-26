import { Booking } from "@/types";
import {
  Calendar,
  MapPin,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: number) => void;
  onReview?: (bookingId: number) => void;
  className?: string;
}

export default function BookingCard({
  booking,
  onCancel,
  onReview,
  className,
}: BookingCardProps) {
  const checkInDate = new Date(booking.checkInDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const checkOutDate = new Date(booking.checkOutDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const getStatusBadge = () => {
    switch (booking.status) {
      case "CONFIRMED":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Confirmed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge variant="error" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return <Badge>{booking.status}</Badge>;
    }
  };

  return (
    <div className={cn("card-base overflow-hidden", className)}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold mb-1">{booking.hotelName}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{booking.hotelCity}</span>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Room:</span>
            <span className="text-muted-foreground">{booking.roomName}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Check-in:</span>
            <span className="text-muted-foreground">{checkInDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Check-out:</span>
            <span className="text-muted-foreground">{checkOutDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Total:</span>
            <span className="text-lg font-bold text-primary-600">
              ${booking.totalPrice}
            </span>
          </div>

          {booking.discountApplied && booking.discountApplied > 0 && (
            <div className="text-xs text-success">
              Discount applied: ${booking.discountApplied}
            </div>
          )}

          {booking.pointsRedeemed && booking.pointsRedeemed > 0 && (
            <div className="text-xs text-secondary-600">
              Points redeemed: {booking.pointsRedeemed}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-neutral-200">
          {booking.canCancel && onCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(booking.id)}
              className="flex-1"
            >
              Cancel Booking
            </Button>
          )}
          {booking.canReview && onReview && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onReview(booking.id)}
              className="flex-1"
            >
              Leave Review
            </Button>
          )}
          {!booking.canCancel && !booking.canReview && (
            <div className="text-sm text-muted-foreground italic">
              No actions available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
