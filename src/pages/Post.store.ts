import { create } from "zustand";
import { persist } from "zustand/middleware";
interface usePostMessage {
  message: string;
  author: string;
  setAuthor: (name: string) => void;
  setMessage: (name: string) => void;
}
export const usePostMessage = create<
  usePostMessage,
  [["zustand/persist", usePostMessage]]
>(
  persist(
    (set) => ({
      message: "",
      author: "",
      setAuthor: (author: string) => set(() => ({ author })),
      setMessage: (message: string) => set(() => ({ message })),
    }),
    {
      name: "my-app-storage",
    }
  )
);
