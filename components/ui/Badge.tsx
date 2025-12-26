import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "featured"
    | "new"
    | "discount"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "secondary";
  size?: "sm" | "md" | "lg";
}

export default function Badge({
  children,
  variant = "info",
  size = "md",
}: BadgeProps) {
  const variants = {
    featured: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white",
    new: "bg-secondary-500 text-white",
    discount: "bg-green-500 text-white",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    info: "bg-neutral-100 text-neutral-700",
    secondary: "bg-secondary-100 text-secondary-700",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
