"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getHotelsAction } from "@/actions/hotels";
import { Hotel } from "@/types";
import HotelCard from "@/components/HotelCard";
import Input from "@/components/ui/Input";

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(hotels);
    }
  }, [searchTerm, hotels]);

  const loadHotels = async () => {
    setLoading(true);
    const result = await getHotelsAction();
    if (result.success && result.data) {
      setHotels(result.data);
      setFilteredHotels(result.data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">
            Explore Hotels
          </h1>
          <p className="text-lg text-neutral-600 mb-6">
            Find your perfect stay from our curated collection
          </p>
          <div className="max-w-xl">
            <Input
              type="text"
              placeholder="Search by name, city, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={20} />}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-96 animate-pulse shadow-soft"
              />
            ))}
          </div>
        ) : filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
            <p className="text-2xl font-semibold text-neutral-900 mb-2">
              No hotels found
            </p>
            <p className="text-neutral-600">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
