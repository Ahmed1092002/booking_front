"use client";

import { useState } from "react";
import { Calendar, Users, X, Tag } from "lucide-react";
import { createBookingAction } from "@/actions/bookings";
import { validateDiscountCodeAction } from "@/actions/promotions";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface Room {
  id: number;
  name: string;
  pricePerNight: number;
  capacity: number;
  viewType?: string;
  hasKitchen?: boolean;
}

interface BookingModalProps {
  hotelId: number;
  hotelName: string;
  rooms: Room[];
  onClose: () => void;
}

export default function BookingModal({
  hotelId,
  hotelName,
  rooms,
  onClose,
}: BookingModalProps) {
  const { showToast } = useToast();
  const router = useRouter();

  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [validatingCode, setValidatingCode] = useState(false);

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedRoom) return 0;
    const room = rooms.find((r) => r.id === selectedRoom);
    if (!room) return 0;

    const nights = calculateNights();
    const basePrice = room.pricePerNight * nights;
    return basePrice - discountAmount;
  };

  // Validate discount code
  const handleValidateDiscount = async () => {
    if (!discountCode.trim()) {
      showToast("Please enter a discount code", "error");
      return;
    }

    setValidatingCode(true);
    const totalPrice = calculateTotalPrice() + discountAmount; // Get price before discount

    const result = await validateDiscountCodeAction(discountCode, totalPrice);

    if (result.success && result.data) {
      const discount = result.data;
      let discountValue = 0;

      if (discount.type === "PERCENTAGE") {
        discountValue = (totalPrice * discount.discountValue) / 100;
      } else {
        discountValue = discount.discountValue;
      }

      setDiscountAmount(discountValue);
      showToast(
        `Discount applied! You save $${discountValue.toFixed(2)}`,
        "success"
      );
    } else {
      setDiscountAmount(0);
      showToast(result.error || "Invalid or expired discount code", "error");
    }

    setValidatingCode(false);
  };

  // Handle booking submission
  const handleSubmit = async () => {
    // Validation
    if (!selectedRoom) {
      showToast("Please select a room", "error");
      return;
    }
    if (!checkInDate || !checkOutDate) {
      showToast("Please select check-in and check-out dates", "error");
      return;
    }

    const nights = calculateNights();
    if (nights <= 0) {
      showToast("Check-out date must be after check-in date", "error");
      return;
    }

    setLoading(true);

    const result = await createBookingAction(selectedRoom, {
      checkInDate,
      checkOutDate,
    });

    if (result.success) {
      showToast("Booking created successfully!", "success");
      onClose();
      router.push("/my-bookings");
    } else {
      showToast(
        result.error || "Failed to create booking. Room may not be available.",
        "error"
      );
    }

    setLoading(false);
  };

  const selectedRoomData = rooms.find((r) => r.id === selectedRoom);
  const nights = calculateNights();
  const totalPrice = calculateTotalPrice();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Book Your Stay</h2>
            <p className="text-muted-foreground">{hotelName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Room Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Select Room
            </label>
            <select
              value={selectedRoom || ""}
              onChange={(e) => setSelectedRoom(Number(e.target.value))}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Choose a room...</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} - ${room.pricePerNight}/night • {room.capacity}{" "}
                  guests
                  {room.viewType ? ` • ${room.viewType} view` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Check-in
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Check-out
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Discount Code */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              <Tag className="h-4 w-4 inline mr-1" />
              Discount Code (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                placeholder="Enter code"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                onClick={handleValidateDiscount}
                disabled={validatingCode || !discountCode.trim()}
                variant="secondary"
              >
                {validatingCode ? "Validating..." : "Apply"}
              </Button>
            </div>
            {discountAmount > 0 && (
              <p className="text-sm text-success mt-2">
                ✓ Discount applied: -${discountAmount.toFixed(2)}
              </p>
            )}
          </div>

          {/* Price Summary */}
          {selectedRoomData && nights > 0 && (
            <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold mb-3">Price Summary</h3>
              <div className="flex justify-between text-sm">
                <span>
                  ${selectedRoomData.pricePerNight} × {nights}{" "}
                  {nights === 1 ? "night" : "nights"}
                </span>
                <span>
                  ${(selectedRoomData.pricePerNight * nights).toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-neutral-200 pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-6 flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !selectedRoom || !checkInDate || !checkOutDate}
            className="flex-1"
          >
            {loading ? "Processing..." : `Book Now - $${totalPrice.toFixed(2)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
