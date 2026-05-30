import { create } from 'zustand';

interface Painting {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  images: string[];
  featured: boolean;
  createdAt: string;
}

interface Store {
  paintings: Painting[];
  setPaintings: (paintings: Painting[]) => void;
  addPainting: (painting: Painting) => void;
  removePainting: (id: string) => void;
  updatePainting: (id: string, painting: Partial<Painting>) => void;
}

export const usePaintingStore = create<Store>((set) => ({
  paintings: [],
  setPaintings: (paintings) => set({ paintings }),
  addPainting: (painting) =>
    set((state) => ({ paintings: [...state.paintings, painting] })),
  removePainting: (id) =>
    set((state) => ({
      paintings: state.paintings.filter((p) => p.id !== id),
    })),
  updatePainting: (id, painting) =>
    set((state) => ({
      paintings: state.paintings.map((p) =>
        p.id === id ? { ...p, ...painting } : p
      ),
    })),
}));