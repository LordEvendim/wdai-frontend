import { create } from "zustand";

interface FilterState {
  filter: string;
  setFilter: (filter: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filter: "",
  setFilter: (filter: string) => set({ filter }),
}));
