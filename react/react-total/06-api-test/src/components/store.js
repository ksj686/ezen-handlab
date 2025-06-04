import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,
  setCount: () => set((prev) => ({ count: prev.count + 1 })),
  msg: "",
}));
