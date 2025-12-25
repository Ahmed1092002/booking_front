import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getHotelByIdAction } from "@/actions/hotels";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Star,
  Image as ImageIcon,
  Plus,
  Edit,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelManagementPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user || !user.roles.includes("ROLE_SELLER")) {
    redirect("/");
  }

  const result = await getHotelByIdAction(Number(id));

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Hotel Not Found
          </h1>
          <Link href="/seller/hotels">
            <Button variant="outline">Back to Hotels</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hotel = result.data;

  // Verify ownership (optional but recommended if API doesn't strictly enforce it on GET)
  // Assuming API handles permission check or we check matching seller ID if available in User type vs Hotel seller
  // For now, relying on API.

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/seller/hotels"
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hotels
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                {hotel.name}
              </h1>
              <div className="flex items-center gap-2 text-neutral-600">
                <MapPin className="w-4 h-4" />
                <span>
                  {hotel.city}, {hotel.address}
                </span>
              </div>
            </div>
            <Link href={`/seller/hotels/${id}/edit`}>
              <Button variant="outline" icon={<Edit />}>
                Edit Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats / Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <p className="text-sm text-neutral-500 mb-1">Average Rating</p>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <span className="text-3xl font-bold text-neutral-900">
                {hotel.averageRating?.toFixed(1) || "N/A"}
              </span>
              <span className="text-sm text-neutral-400">
                ({hotel.reviewCount || 0} reviews)
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <p className="text-sm text-neutral-500 mb-1">Total Rooms</p>
            <p className="text-3xl font-bold text-neutral-900">
              {hotel.rooms?.length || 0}
            </p>
          </div>
          {/* Add more stats */}
        </div>

        {/* Rooms Section */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-8">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900">Rooms</h2>
            {/* Link to Add Room page - To be implemented */}
            <Button variant="primary" size="sm" icon={<Plus />}>
              Add Room
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 text-neutral-500 text-sm font-medium">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Capacity</th>
                  <th className="p-4">Price/Night</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {hotel.rooms && hotel.rooms.length > 0 ? (
                  hotel.rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-neutral-50 group">
                      <td className="p-4 font-medium text-neutral-900">
                        {room.name}
                      </td>
                      <td className="p-4 text-neutral-600">{room.viewType}</td>
                      <td className="p-4 text-neutral-600">
                        {room.capacity} Guests
                      </td>
                      <td className="p-4 font-semibold text-primary-600">
                        ${room.pricePerNight}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Link href={`/seller/rooms/${room.id}/calendar`}>
                            <Button variant="ghost" size="sm">
                              Calendar
                            </Button>
                          </Link>
                          {/* Edit Room Button */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-neutral-500"
                    >
                      No rooms added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900">Gallery</h2>
            <Button variant="outline" size="sm" icon={<ImageIcon />}>
              Manage Images
            </Button>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {hotel.images && hotel.images.length > 0 ? (
              hotel.images.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square rounded-lg overflow-hidden relative group"
                >
                  <img
                    src={image.imageUrl}
                    alt="Hotel"
                    className="w-full h-full object-cover"
                  />
                  {image.isPrimary && (
                    <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                      Main
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-neutral-500">
                No images uploaded.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
