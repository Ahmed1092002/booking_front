"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { addRoomAction } from "@/actions/hotels";
import { useToast } from "@/hooks/useToast";
import Button from "@/components/ui/Button";
import { CreateRoomDto } from "@/types";

interface AddRoomFormProps {
  hotelId: number;
  onSuccess: () => void;
  onClose: () => void;
}

export default function AddRoomForm({
  hotelId,
  onSuccess,
  onClose,
}: AddRoomFormProps) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateRoomDto>({
    name: "",
    pricePerNight: 0,
    capacity: 1,
    viewType: "Standard",
    hasKitchen: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      showToast("Please enter a room name", "error");
      return;
    }
    if (formData.pricePerNight <= 0) {
      showToast("Price must be greater than 0", "error");
      return;
    }
    if (formData.capacity < 1) {
      showToast("Capacity must be at least 1", "error");
      return;
    }

    setLoading(true);

    const result = await addRoomAction(hotelId, formData);

    if (result.success) {
      showToast("Room added successfully!", "success");
      onSuccess();
      onClose();
    } else {
      showToast(result.error || "Failed to add room", "error");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Room</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Room Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Deluxe Suite, Standard Room"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          {/* Price Per Night */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Price Per Night ($) *
            </label>
            <input
              type="number"
              value={formData.pricePerNight || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pricePerNight: Number(e.target.value),
                })
              }
              placeholder="100"
              min="1"
              step="0.01"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Guest Capacity *
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: Number(e.target.value) })
              }
              placeholder="2"
              min="1"
              max="20"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          {/* View Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              View Type
            </label>
            <select
              value={formData.viewType}
              onChange={(e) =>
                setFormData({ ...formData, viewType: e.target.value })
              }
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Standard">Standard</option>
              <option value="City">City View</option>
              <option value="Sea">Sea View</option>
              <option value="Garden">Garden View</option>
              <option value="Mountain">Mountain View</option>
              <option value="Pool">Pool View</option>
            </select>
          </div>

          {/* Has Kitchen */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasKitchen"
              checked={formData.hasKitchen}
              onChange={(e) =>
                setFormData({ ...formData, hasKitchen: e.target.checked })
              }
              className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500"
            />
            <label htmlFor="hasKitchen" className="text-sm font-medium">
              This room has a kitchen
            </label>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
              icon={<Plus className="h-5 w-5" />}
            >
              {loading ? "Adding Room..." : "Add Room"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
