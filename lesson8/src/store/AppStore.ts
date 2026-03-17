import { create } from 'zustand';
import type { Product } from '@/features/products/types';
import type { CartItem } from '@/features/cart/types';

type AppStore = {
  products: Product[];
  items: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  products: [
    { id: '1', name: 'Product One', price: 1990, description: 'A first product' },
    { id: '2', name: 'Product Two', price: 2990, description: 'A second product' },
    { id: '3', name: 'Product Three', price: 3990, description: 'A third product' },
  ],
  items: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),
}));