import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Hotel } from "@/types";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Link href={`/hotels/${hotel.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer group">
        {/* Hotel Image Placeholder */}
        <div className="h-52 bg-linear-to-br from-primary-400 to-secondary-500 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-400 to-secondary-400">
            <span className="text-white text-7xl font-bold opacity-20">
              {hotel.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-500 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-primary-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">4.5</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-neutral-500 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {hotel.city}, {hotel.address}
            </span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700 font-medium"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700 font-medium">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
            <span className="text-sm text-neutral-500">
              by {hotel.seller.fullName}
            </span>
            <span className="text-sm text-primary-500 font-semibold group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
