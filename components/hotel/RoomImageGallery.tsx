"use client";

import { useState, useEffect } from "react";
import { Upload, Star, Trash2, X } from "lucide-react";
import {
  getRoomImagesAction,
  uploadRoomImageAction,
  setPrimaryRoomImageAction,
  deleteRoomImageAction,
} from "@/actions/images";
import { useToast } from "@/hooks/useToast";
import { RoomImage } from "@/types";

interface RoomImageGalleryProps {
  roomId: number;
  roomName: string;
  onClose: () => void;
}

export default function RoomImageGallery({
  roomId,
  roomName,
  onClose,
}: RoomImageGalleryProps) {
  const { showToast } = useToast();
  const [images, setImages] = useState<RoomImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadImages = async () => {
    setLoading(true);
    const result = await getRoomImagesAction(roomId);

    if (result.success && result.data) {
      setImages(result.data);
    } else {
      showToast(result.error || "Failed to load images", "error");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size must be less than 5MB", "error");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const result = await uploadRoomImageAction(roomId, formData);

    if (result.success) {
      showToast("Image uploaded successfully!", "success");
      loadImages();
    } else {
      showToast(result.error || "Failed to upload image", "error");
    }

    setUploading(false);
    e.target.value = "";
  };

  const handleSetPrimary = async (imageId: number) => {
    const result = await setPrimaryRoomImageAction(roomId, imageId);

    if (result.success) {
      showToast("Primary image updated!", "success");
      loadImages();
    } else {
      showToast(result.error || "Failed to set primary image", "error");
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    const result = await deleteRoomImageAction(roomId, imageId);

    if (result.success) {
      showToast("Image deleted successfully!", "success");
      loadImages();
    } else {
      showToast(result.error || "Failed to delete image", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Room Images</h2>
            <p className="text-sm text-muted-foreground">{roomName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block">
              <div
                className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  uploading
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-primary-600 text-white hover:bg-primary-700 cursor-pointer"
                }`}
              >
                <Upload className="h-5 w-5" />
                {uploading ? "Uploading..." : "Upload Image"}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
            </label>
            <p className="text-sm text-muted-foreground mt-2">
              Maximum file size: 5MB. Supported formats: JPG, PNG, WebP
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading images...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
              <p className="text-muted-foreground">No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group aspect-square rounded-lg overflow-hidden bg-neutral-100"
                >
                  <img
                    src={image.imageUrl}
                    alt={`Room image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Note: RoomImage might not have isPrimary, adjust if needed */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleSetPrimary(image.id)}
                      className="p-2 bg-white rounded-lg hover:bg-neutral-100 transition-colors"
                      title="Set as primary"
                    >
                      <Star className="h-5 w-5 text-warning" />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-2 bg-white rounded-lg hover:bg-error hover:text-white transition-colors"
                      title="Delete image"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
