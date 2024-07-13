import { create } from "zustand";

interface Product {
  product: string;
}

interface ProductStore {
  products: Record<string, number>;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: {},

  // Add or increment product quantity
  addProduct: ({ product }) => set((state) => {
    const products = { ...state.products };
    products[product] = (products[product] || 0) + 1;
    return { products };
  }),

  // Decrement or remove product
  removeProduct: ({ product }) => set((state) => {
    const products = { ...state.products };
    if (products[product] > 1) {
      products[product]--;
    } else {
      delete products[product];
    }
    return { products };
  }),
}));

// Memoized selector to avoid unnecessary re-renders
export const useProducts = () => useProductStore((state) => state.products);
export const useAddProduct = () => useProductStore((state) => state.addProduct);
export const useRemoveProduct = () => useProductStore((state) => state.removeProduct);
