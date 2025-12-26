"use client";

import { useState } from "react";
import { HotelImage } from "@/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

interface HotelGalleryProps {
  images: HotelImage[];
  hotelName: string;
  className?: string;
}

export default function HotelGallery({
  images,
  hotelName,
  className,
}: HotelGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          "w-full h-[500px] bg-neutral-200 flex items-center justify-center",
          className
        )}
      >
        <p className="text-neutral-400">No images available</p>
      </div>
    );
  }

  const sortedImages = [...images].sort((a, b) =>
    a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1
  );

  const mainImage = sortedImages[currentIndex];
  const thumbnails = sortedImages.slice(0, 5);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sortedImages.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className={cn("w-full", className)}>
        {/* Main Image */}
        <div className="relative w-full h-[500px] bg-neutral-200 overflow-hidden rounded-t-lg">
          <img
            src={mainImage.imageUrl}
            alt={`${hotelName} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />

          {/* Navigation Arrows */}
          {sortedImages.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {sortedImages.length}
          </div>
        </div>

        {/* Thumbnails */}
        {sortedImages.length > 1 && (
          <div className="grid grid-cols-5 gap-2 mt-2">
            {thumbnails.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "relative h-24 bg-neutral-200 overflow-hidden rounded-lg transition-all",
                  currentIndex === index
                    ? "ring-2 ring-primary-500"
                    : "hover:opacity-80"
                )}
              >
                <img
                  src={image.imageUrl}
                  alt={`${hotelName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {image.isPrimary && (
                  <div className="absolute top-1 left-1 bg-primary-500 text-white text-xs px-2 py-0.5 rounded">
                    Main
                  </div>
                )}
              </button>
            ))}
            {sortedImages.length > 5 && (
              <button
                onClick={() => setLightboxOpen(true)}
                className="h-24 bg-neutral-800 text-white flex items-center justify-center rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <span className="text-sm font-medium">
                  +{sortedImages.length - 5} more
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <div className="relative w-full max-w-6xl max-h-[90vh]">
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute -top-12 right-0 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image */}
          <div className="relative w-full h-[80vh] bg-black rounded-lg overflow-hidden">
            <img
              src={sortedImages[currentIndex].imageUrl}
              alt={`${hotelName} - Image ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Navigation */}
            {sortedImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
              {currentIndex + 1} / {sortedImages.length}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
