import Link from "next/link";
import { MapPin, Hotel, Star } from "lucide-react";

const popularDestinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    description:
      "The City of Light, famous for the Eiffel Tower, art, and cuisine",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    hotelCount: 1250,
    averagePrice: 180,
    rating: 4.7,
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    description: "A vibrant metropolis blending tradition and modernity",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    hotelCount: 980,
    averagePrice: 150,
    rating: 4.8,
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    description: "The city that never sleeps, iconic skyline and culture",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    hotelCount: 1500,
    averagePrice: 220,
    rating: 4.6,
  },
  {
    id: 4,
    name: "London",
    country: "UK",
    description: "Historic capital with royal palaces and modern attractions",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    hotelCount: 1100,
    averagePrice: 200,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Dubai",
    country: "UAE",
    description: "Luxury destination with stunning architecture and beaches",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    hotelCount: 750,
    averagePrice: 250,
    rating: 4.9,
  },
  {
    id: 6,
    name: "Barcelona",
    country: "Spain",
    description: "Mediterranean charm with Gaudí architecture and beaches",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    hotelCount: 850,
    averagePrice: 140,
    rating: 4.7,
  },
  {
    id: 7,
    name: "Rome",
    country: "Italy",
    description: "Ancient history meets modern Italian lifestyle",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    hotelCount: 920,
    averagePrice: 160,
    rating: 4.6,
  },
  {
    id: 8,
    name: "Singapore",
    country: "Singapore",
    description: "Futuristic city-state with diverse culture and cuisine",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    hotelCount: 650,
    averagePrice: 190,
    rating: 4.8,
  },
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Popular Destinations
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Discover amazing places around the world and find the perfect hotel
            for your next adventure
          </p>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularDestinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/hotels?city=${encodeURIComponent(destination.name)}`}
              className="group"
            >
              <div className="card-base overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-semibold">
                      {destination.rating}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-xl font-bold mb-1">
                      {destination.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{destination.country}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-neutral-600">
                      <Hotel className="w-4 h-4" />
                      <span>{destination.hotelCount} hotels</span>
                    </div>
                    <div className="text-primary-600 font-semibold">
                      From ${destination.averagePrice}/night
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white border-t py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't find your destination?
          </h2>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            We have hotels in hundreds of cities worldwide. Use our search to
            find accommodations anywhere you want to go.
          </p>
          <Link href="/hotels">
            <button className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Browse All Hotels
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
