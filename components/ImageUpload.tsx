"use client";

import { useRef, FormEvent } from "react";
import { Upload, X } from "lucide-react";
import Button from "./ui/Button";
import LoadingSpinner from "./ui/LoadingSpinner";

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  loading?: boolean;
  accept?: string;
  maxSizeMB?: number;
}

export default function ImageUpload({
  onUpload,
  loading = false,
  accept = "image/*",
  maxSizeMB = 5,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        alert(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      await onUpload(file);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={loading}
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full border-2 border-dashed border-neutral-300 rounded-xl p-8 hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner />
            <p className="text-sm text-neutral-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-900">
                Click to upload image
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
