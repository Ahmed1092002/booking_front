import { create } from "zustand";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  initializeFromCookies: () => void;
}

// Helper to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  initializeFromCookies: () => {
    const userInfoCookie = getCookie("user-info");
    if (userInfoCookie) {
      try {
        const user = JSON.parse(decodeURIComponent(userInfoCookie));
        set({ user });
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  },
}));
