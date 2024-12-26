import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: "Product 2",
      price: 500,
      quantity: 3,
    },
    {
      id: 3,
      name: "Product 3",
      price: 120,
      quantity: 1,
    },
  ],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}));
