"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import HotelImageGallery from "./HotelImageGallery";

interface HotelImageGalleryButtonProps {
  hotelId: number;
}

export default function HotelImageGalleryButton({
  hotelId,
}: HotelImageGalleryButtonProps) {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        icon={<ImageIcon />}
        onClick={() => setShowGallery(true)}
      >
        Manage Images
      </Button>

      {showGallery && (
        <HotelImageGallery
          hotelId={hotelId}
          onClose={() => setShowGallery(false)}
        />
      )}
    </>
  );
}
