"use client";

import { useEffect, useState } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/Toast";
import { useToastStore } from "@/stores/toast-store";

export default function Toaster() {
  const { toasts, removeToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ToastProvider>
      {toasts.map(({ id, message, type }) => {
        // Map old types to new variants
        const variant =
          type === "success"
            ? "success"
            : type === "error"
            ? "error"
            : "default";

        return (
          <Toast
            key={id}
            variant={variant}
            duration={3000}
            onOpenChange={(open) => {
              if (!open) removeToast(id);
            }}
          >
            <div className="grid gap-1">
              <ToastTitle>
                {type === "success" && "✓ Success"}
                {type === "error" && "✕ Error"}
                {type === "info" && "ℹ Info"}
              </ToastTitle>
              <ToastDescription>{message}</ToastDescription>
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
