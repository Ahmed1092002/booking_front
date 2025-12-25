"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBookingAction } from "@/actions/bookings";
import { useToastStore } from "@/stores/toast-store";
import { Room } from "@/types";
import Button from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";

interface BookingModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BookingModal({
  room,
  isOpen,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const { addToast } = useToastStore();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  // Radix Dialog handles visibility via the `open` prop if we control it, or just mounting/unmounting.
  // Our parent controls `isOpen`. Radix Dialog `onOpenChange` can sync back.

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalPrice = calculateNights() * room.pricePerNight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      addToast("Please select check-in and check-out dates", "error");
      return;
    }

    if (checkOutDate <= checkInDate) {
      addToast("Check-out date must be after check-in date", "error");
      return;
    }

    setLoading(true);
    const result = await createBookingAction(room.id, {
      checkInDate: checkInDate.toISOString().split("T")[0],
      checkOutDate: checkOutDate.toISOString().split("T")[0],
    });
    setLoading(false);

    if (result.success) {
      addToast("Booking created successfully!", "success");
      onClose();
      if (onSuccess) onSuccess();
    } else {
      addToast(result.error || "Failed to create booking", "error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Room</DialogTitle>
          <DialogDescription>
            {room.name} at {room.hotel.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="bg-neutral-50 rounded-xl p-4 mb-4">
            <p className="text-sm text-neutral-500">Price per night</p>
            <p className="text-2xl font-bold text-primary-500">
              ${room.pricePerNight}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in</label>
              <DatePicker
                selected={checkInDate}
                onChange={(date: Date | null) => setCheckInDate(date)}
                minDate={new Date()}
                className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50"
                placeholderText="Select date"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-out</label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date: Date | null) => setCheckOutDate(date)}
                minDate={checkInDate || new Date()}
                className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50"
                placeholderText="Select date"
              />
            </div>
          </div>

          {checkInDate && checkOutDate && (
            <div className="flex justify-between items-center bg-neutral-100 p-3 rounded-lg mt-4">
              <span className="text-sm font-medium">
                Total ({calculateNights()} nights)
              </span>
              <span className="text-lg font-bold text-primary-600">
                ${totalPrice}
              </span>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
