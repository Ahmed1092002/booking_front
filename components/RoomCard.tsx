import { Users, Eye, Utensils, CheckCircle, XCircle } from "lucide-react";
import { Room } from "@/types";

interface RoomCardProps {
  room: Room;
  onBook: () => void;
}

export default function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 mb-1">
            {room.name}
          </h3>
          <p className="text-neutral-600 text-sm">{room.viewType} view</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary-500">
            ${room.pricePerNight}
          </p>
          <p className="text-neutral-500 text-sm">per night</p>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-2 text-neutral-700">
          <Users className="w-5 h-5 text-primary-500" />
          <span className="text-sm font-medium">
            Capacity: {room.capacity} guests
          </span>
        </div>
        <div className="flex items-center gap-2 text-neutral-700">
          <Utensils className="w-5 h-5 text-primary-500" />
          <span className="text-sm font-medium">
            {room.hasKitchen ? "Kitchen included" : "No kitchen"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {room.available ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                Available
              </span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-red-600">
                Not available
              </span>
            </>
          )}
        </div>
      </div>

      <button
        onClick={onBook}
        disabled={!room.available}
        className={`
          w-full py-3 rounded-xl font-semibold transition-all duration-200
          ${
            room.available
              ? "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg"
              : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
          }
        `}
      >
        {room.available ? "Book Now" : "Unavailable"}
      </button>
    </div>
  );
}
