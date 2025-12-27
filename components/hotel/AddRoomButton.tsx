"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import AddRoomForm from "./AddRoomForm";

interface AddRoomButtonProps {
  hotelId: number;
}

export default function AddRoomButton({ hotelId }: AddRoomButtonProps) {
  const handleSuccess = () => {
    window.location.reload();
  };
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        icon={<Plus />}
        onClick={() => setShowForm(true)}
      >
        Add Room
      </Button>

      {showForm && (
        <AddRoomForm
          hotelId={hotelId}
          onSuccess={handleSuccess}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
