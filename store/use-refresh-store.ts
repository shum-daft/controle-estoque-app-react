import { create } from "zustand";

interface RefreshStore {
  refresh: number;
  addRefresh: (refresh: number) => void;
  removeRefresh: () => void;
}

export const useRefreshStore = create<RefreshStore>((set) => ({
  refresh: 0,
  addRefresh: (refresh) => set((state) => ({ refresh: refresh })),
  removeRefresh: () => set({ refresh: 0 }),
}));
