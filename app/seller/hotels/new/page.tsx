"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createHotelAction } from "@/actions/hotels";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CreateHotelDto } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(
  () => import("@/components/hotel/LocationPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full bg-neutral-100 rounded-lg animate-pulse" />
    ),
  }
);

const availableAmenities = [
  "Free Wi-Fi",
  "Swimming Pool",
  "Gym",
  "Spa",
  "Restaurant",
  "Bar",
  "Parking",
  "Room Service",
  "Air Conditioning",
  "Ocean View",
  "Pet Friendly",
  "Concierge",
];

export default function NewHotelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [googleMapUrl, setGoogleMapUrl] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoordinates({ lat, lng });
    // Auto-generate Google Maps URL
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    setGoogleMapUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: CreateHotelDto = {
      name: formData.get("name") as string,
      city: formData.get("city") as string,
      address: formData.get("address") as string,
      googleMapUrl: googleMapUrl || (formData.get("googleMapUrl") as string),
      amenities: selectedAmenities,
    };

    const result = await createHotelAction(data);

    if (result.success) {
      router.push("/seller/hotels");
    } else {
      setError(result.error || "Failed to create hotel");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          href="/seller/hotels"
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hotels
        </Link>

        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Add New Hotel
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-8 shadow-soft space-y-6"
        >
          <Input
            label="Hotel Name"
            name="name"
            placeholder="e.g. Grand Luxury Hotel"
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="City"
              name="city"
              placeholder="e.g. New York"
              required
            />
            <Input
              label="Address"
              name="address"
              placeholder="e.g. 123 Broadway St"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Location
            </label>
            <LocationPicker onLocationSelect={handleLocationSelect} />
            {coordinates && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {coordinates.lat.toFixed(6)},{" "}
                {coordinates.lng.toFixed(6)}
              </p>
            )}
          </div>

          <Input
            label="Google Maps URL"
            name="googleMapUrl"
            value={googleMapUrl}
            onChange={(e) => setGoogleMapUrl(e.target.value)}
            placeholder="Embed URL from Google Maps"
            required
            className="bg-neutral-50"
          />

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className={`
                     flex items-center p-3 rounded-lg border cursor-pointer transition-all
                     ${
                       selectedAmenities.includes(amenity)
                         ? "border-primary-500 bg-primary-50 text-primary-700"
                         : "border-neutral-200 hover:border-neutral-300"
                     }
                   `}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <span className="text-sm font-medium">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
            >
              Create Hotel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
