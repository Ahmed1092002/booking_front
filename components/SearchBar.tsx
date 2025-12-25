"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import Button from "./ui/Button";

interface SearchBarProps {
  onSearch?: (params: SearchParams) => void;
  variant?: "hero" | "page";
}

interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function SearchBar({
  onSearch,
  variant = "page",
}: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ location, checkIn, checkOut, guests });
    }
  };

  const isHero = variant === "hero";

  return (
    <div
      className={`
      ${isHero ? "bg-white shadow-soft-lg" : "bg-white shadow-soft"}
      rounded-2xl p-2
      ${isHero ? "max-w-5xl mx-auto" : "w-full"}
    `}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Location */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 transition-colors">
          <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm text-neutral-900 placeholder-neutral-400 bg-transparent border-none outline-none"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 transition-colors border-l border-neutral-100">
          <Calendar className="w-5 h-5 text-primary-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm text-neutral-900 bg-transparent border-none outline-none"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 transition-colors border-l border-neutral-100">
          <Calendar className="w-5 h-5 text-primary-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm text-neutral-900 bg-transparent border-none outline-none"
            />
          </div>
        </div>

        {/* Guests & Search Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 transition-colors flex-1 border-l border-neutral-100">
            <Users className="w-5 h-5 text-primary-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Guests
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full text-sm text-neutral-900 bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <Button
            variant="primary"
            size={isHero ? "lg" : "default"}
            onClick={handleSearch}
            icon={<Search className="w-5 h-5" />}
            className="flex-shrink-0"
          >
            {isHero ? "Search" : ""}
          </Button>
        </div>
      </div>
    </div>
  );
}
