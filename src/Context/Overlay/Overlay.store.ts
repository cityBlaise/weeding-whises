import { ReactNode } from "react";
import { create } from "zustand";
export interface OverlayStore {
  isOpen: boolean;
  closeOnClickOutside: boolean; 
  children: { id: string; child: ReactNode }[];
  open: (child: ReactNode,id:string, closeOnClickOutside?: boolean,) => string;
  close: (items?: string) => void;
}

export const useOverlay = create<OverlayStore>((set) => ({
  isOpen: false,
  closeOnClickOutside: false, 
  children: [],
  open: (child: ReactNode,id, closeOnClickOutside: boolean = false) => {
    set((state) => ({
      isOpen: true,
      child,
      closeOnClickOutside,
      children: [...state.children, { id, child }],
    }));
    return id;
  },
  close: (id: string = "") => {
    set((state) => ({
      isOpen: state.children.filter((x) => x.id !== id).length != 0,
      children: [...state.children.filter((x) => x.id !== id)],
    }));
    return id;
  },
}));
