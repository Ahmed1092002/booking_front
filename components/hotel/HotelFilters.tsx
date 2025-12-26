"use client";

import { HotelSearchFilters } from "@/types";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

interface HotelFiltersProps {
  filters: HotelSearchFilters;
  onChange: (filters: HotelSearchFilters) => void;
  onReset: () => void;
  className?: string;
}

const AMENITIES_OPTIONS = [
  "WiFi",
  "Pool",
  "Gym",
  "Restaurant",
  "Parking",
  "Spa",
  "Air Conditioning",
  "Room Service",
];

export default function HotelFilters({
  filters,
  onChange,
  onReset,
  className,
}: HotelFiltersProps) {
  const handleChange = (
    key: keyof HotelSearchFilters,
    value: string | number | string[] | undefined
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = filters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];
    handleChange("amenities", newAmenities);
  };

  const hasActiveFilters =
    filters.city ||
    filters.minPrice ||
    filters.maxPrice ||
    (filters.amenities && filters.amenities.length > 0) ||
    filters.minCapacity ||
    filters.checkInDate ||
    filters.checkOutDate;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            icon={<X className="h-4 w-4" />}
          >
            Reset
          </Button>
        )}
      </div>

      {/* City */}
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          type="text"
          placeholder="Enter city name"
          value={filters.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div>
        <Label>Price Range (per night)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) =>
                handleChange(
                  "minPrice",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                handleChange(
                  "maxPrice",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Check-in / Check-out */}
      <div>
        <Label htmlFor="checkIn">Check-in Date</Label>
        <Input
          id="checkIn"
          type="date"
          value={filters.checkInDate || ""}
          onChange={(e) => handleChange("checkInDate", e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="checkOut">Check-out Date</Label>
        <Input
          id="checkOut"
          type="date"
          value={filters.checkOutDate || ""}
          onChange={(e) => handleChange("checkOutDate", e.target.value)}
          min={filters.checkInDate || undefined}
          className="mt-1"
        />
      </div>

      {/* Capacity */}
      <div>
        <Label htmlFor="capacity">Minimum Capacity</Label>
        <select
          id="capacity"
          value={filters.minCapacity?.toString() || ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange(
              "minCapacity",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Any</option>
          <option value="1">1+ guests</option>
          <option value="2">2+ guests</option>
          <option value="3">3+ guests</option>
          <option value="4">4+ guests</option>
          <option value="5">5+ guests</option>
        </select>
      </div>

      {/* Amenities */}
      <div>
        <Label>Amenities</Label>
        <div className="space-y-2 mt-2">
          {AMENITIES_OPTIONS.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={(filters.amenities || []).includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <Label htmlFor="sortBy">Sort By</Label>
        <select
          id="sortBy"
          value={filters.sortBy || ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange(
              "sortBy",
              e.target.value as "price" | "rating" | "name" | undefined
            )
          }
          className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Default</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
        </select>
      </div>

      {filters.sortBy && (
        <div>
          <Label htmlFor="sortOrder">Sort Order</Label>
          <select
            id="sortOrder"
            value={filters.sortOrder || "asc"}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange("sortOrder", e.target.value as "asc" | "desc")
            }
            className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      )}
    </div>
  );
}
