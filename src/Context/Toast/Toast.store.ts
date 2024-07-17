import { nanoid } from "nanoid";
import { create } from "zustand";

interface ToastStore {
  addToast: (toast: Omit<Toast,"id">) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast: Omit<Toast,"id">) =>
    set((store) => ({
      toasts: [...store.toasts, { ...toast,id:nanoid(5) }],
    })),
  removeToast: (id: string) =>
    set((store) => ({
      toasts: [...store.toasts.filter((t) => t.id !== id)],
    })),
}));

export interface Toast {
  id: string;
  text: string;
  type?: ToastType;
  duration?: number;
}

export type ToastType = "error" | "warning" | "normal" | "success";
