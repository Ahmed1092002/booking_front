"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateHotelAction, getHotelByIdAction } from "@/actions/hotels";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CreateHotelDto, Hotel } from "@/types";
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

export default function EditHotelPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [initialData, setInitialData] = useState<Hotel | null>(null);
  const [googleMapUrl, setGoogleMapUrl] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const loadHotel = async () => {
    const result = await getHotelByIdAction(id);
    if (result.success && result.data) {
      setInitialData(result.data);
      setSelectedAmenities(result.data.amenities || []);
      setGoogleMapUrl(result.data.googleMapUrl || "");

      // Try to extract coordinates from existing URL
      if (result.data.googleMapUrl && result.data.googleMapUrl.includes("q=")) {
        try {
          // Format usually ...?q=lat,lng
          const urlParams = new URL(result.data.googleMapUrl).searchParams;
          const q = urlParams.get("q");
          if (q) {
            const [lat, lng] = q.split(",").map(Number);
            if (!isNaN(lat) && !isNaN(lng)) {
              setCoordinates({ lat, lng });
            }
          }
        } catch (e) {
          console.error("Failed to parse map URL", e);
        }
      }
    } else {
      setError("Failed to load hotel data");
    }
    setInitialLoading(false);
  };

  useEffect(() => {
    loadHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoordinates({ lat, lng });
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

    const result = await updateHotelAction(id, data);

    if (result.success) {
      router.push(`/seller/hotels/${id}`);
    } else {
      setError(result.error || "Failed to update hotel");
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p>Hotel not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          href={`/seller/hotels/${id}`}
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hotel
        </Link>

        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Edit Hotel</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-8 shadow-soft space-y-6"
        >
          <Input
            label="Hotel Name"
            name="name"
            defaultValue={initialData.name}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="City"
              name="city"
              defaultValue={initialData.city}
              required
            />
            <Input
              label="Address"
              name="address"
              defaultValue={initialData.address}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Location
            </label>
            <LocationPicker
              onLocationSelect={handleLocationSelect}
              initialLat={coordinates?.lat}
              initialLng={coordinates?.lng}
            />
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
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
