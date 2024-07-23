import { create } from "zustand";

export const useDataFetchingIndicator = create<DataFetchingIndicator>(
  (set) => ({
    loading: false,
    setLoading: (loading: boolean) => set(() => ({ loading })),
  })
);

interface DataFetchingIndicator {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
