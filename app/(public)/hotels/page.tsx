"use client";

import { useState, useEffect } from "react";
import { Hotel, HotelSearchFilters } from "@/types";
import {
  advancedHotelSearchAction,
  getHotelsAction,
  searchHotelsByCityAction,
} from "@/actions/hotels";
import HotelCard from "@/components/hotel/HotelCard";
import HotelFilters from "@/components/hotel/HotelFilters";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<HotelSearchFilters>({
    sortBy: "name",
    sortOrder: "asc",
  });

  const searchHotels = async () => {
    setLoading(true);
    setError(null);

    const result = await advancedHotelSearchAction(filters);

    if (result.success && result.data) {
      setHotels(result.data);
    } else {
      setError(result.error || "Failed to load hotels");
    }

    setLoading(false);
  };

  const handleApplyFilters = () => {
    searchHotels();
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setFilters({
      sortBy: "name",
      sortOrder: "asc",
    });
  };
  useEffect(() => {
    searchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Search from thousands of hotels worldwide
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            icon={
              showFilters ? (
                <X className="h-5 w-5" />
              ) : (
                <SlidersHorizontal className="h-5 w-5" />
              )
            }
            className="w-full"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`
              lg:w-80 flex-shrink-0
              ${showFilters ? "block" : "hidden lg:block"}
            `}
          >
            <div className="card-base p-6 sticky top-4">
              <HotelFilters
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
              />

              <Button
                onClick={handleApplyFilters}
                className="w-full mt-6"
                icon={<Search className="h-5 w-5" />}
              >
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    {hotels.length} {hotels.length === 1 ? "Hotel" : "Hotels"}{" "}
                    Found
                  </>
                )}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    setLoading(true);
                    const result = await getHotelsAction();
                    if (result.success && result.data) {
                      setHotels(result.data);
                    }
                    setLoading(false);
                  }}
                >
                  Show All
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="card-base p-8 text-center">
                <p className="text-error mb-4">{error}</p>
                <Button onClick={searchHotels}>Try Again</Button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && hotels.length === 0 && (
              <div className="card-base p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-neutral-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No hotels found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <Button onClick={handleResetFilters} variant="outline">
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Hotels Grid */}
            {!loading && !error && hotels.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} variant="grid" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
