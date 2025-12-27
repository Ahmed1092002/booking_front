"use client";

import { useState } from "react";
import { Users, Eye, Utensils } from "lucide-react";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/booking/BookingModal";

interface Room {
  id: number;
  name: string;
  pricePerNight: number;
  capacity: number;
  viewType?: string;
  hasKitchen?: boolean;
  isAvailable?: boolean;
  available?: boolean;
  hotelId?: number;
  hotelName?: string;
}

interface RoomCardProps {
  room: Room;
  hotelId?: number;
  hotelName?: string;
}

export default function RoomCard({ room, hotelId, hotelName }: RoomCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const isAvailable = room.isAvailable ?? room.available ?? true;

  return (
    <>
      <div className="card-base p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Room Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{room.name}</h3>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
                </span>
              </div>

              {room.viewType && (
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{room.viewType} view</span>
                </div>
              )}

              {room.hasKitchen && (
                <div className="flex items-center gap-1">
                  <Utensils className="h-4 w-4" />
                  <span>Kitchen</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  isAvailable
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                {isAvailable ? "Available" : "Unavailable"}
              </div>
            </div>
          </div>

          {/* Price & Booking */}
          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-3xl font-bold text-primary-600">
                ${room.pricePerNight}
              </p>
              <p className="text-sm text-muted-foreground">per night</p>
            </div>

            <Button
              onClick={() => setShowBookingModal(true)}
              disabled={!isAvailable}
              className="w-full md:w-auto"
            >
              {isAvailable ? "Book Now" : "Not Available"}
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && hotelId && hotelName && (
        <BookingModal
          hotelId={hotelId}
          hotelName={hotelName}
          rooms={[room]}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
}
