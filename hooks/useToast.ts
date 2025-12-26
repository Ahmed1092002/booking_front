import { useToastStore } from "@/stores/toast-store";

export function useToast() {
  const { addToast } = useToastStore();

  return {
    showToast: addToast,
  };
}
