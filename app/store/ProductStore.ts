import {create} from "zustand";


interface Product {
  name: string;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: string;
  price: number;
}


interface ProductCart {
  name: string;
  price: number;
  quantity: number;
  total: number;
}


interface ProductStore {
  loadData: (data: Product[]) => void;
  productCart: Record<string, ProductCart>;
  productData: Record<string, Product>;
  addProduct: (productName: string) => void;
  removeProduct: (productName: string) => void;
  isProductInCart: (productName: string) => boolean;
  calculateTotalPrice: () => number;
  calculateTotalItems: () => number;

}


export const useProductStore = create<ProductStore>((set, get) => ({
  productCart: {},
  productData: {},

  // Load data and include the entirety of product data
  loadData: (data) => set(() => {
    const productData = data.reduce((acc, product) => {
      acc[product.name] = product;
      return acc;
    }, {} as Record<string, Product>);
    return {productData};
  }),

  // Add or increment product quantity
  addProduct: (productName) => set((state) => {
    const productData = state.productData[productName];
    const productCart = {...state.productCart};
    if (productCart[productName]) {
      productCart[productName].quantity += 1;
      productCart[productName].total = productCart[productName].quantity * productData.price;
    } else {
      productCart[productName] = {
        name: productData.name,
        price: productData.price,
        quantity: 1,
        total: productData.price,
      };
    }
    return {productCart};
  }),

  // Decrement or remove product
  removeProduct: (productName) => set((state) => {
    const productData = state.productData[productName];
    const productCart = {...state.productCart};
    if (productCart[productName]) {
      productCart[productName].quantity -= 1;
      productCart[productName].total = productCart[productName].quantity * productData.price;
      if (productCart[productName].quantity === 0) {
        delete productCart[productName];
      }
    }
    return {productCart};
  }),

  // Check if product exists in cart
  isProductInCart: (productName) => {
    return !!get().productCart[productName];
  },

  // Calculate totals
  calculateTotalPrice: () => {
    return Object.values(get().productCart).reduce((acc, product) => {
      return acc + product.total;
    }, 0);
  },

  calculateTotalItems: () => {
    return Object.values(get().productCart).reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  },
}));





// Memoized selectors to avoid unnecessary re-renders
export const useLoadData = () => useProductStore((state) => state.loadData);
export const useProductCart = () => useProductStore((state) => state.productCart);
export const useProductData = () => useProductStore((state) => state.productData);
export const useAddProduct = () => useProductStore((state) => state.addProduct);
export const useRemoveProduct = () => useProductStore((state) => state.removeProduct);
export const useIsProductInCart = () => useProductStore((state) => state.isProductInCart);
export const useCalculateTotalPrice = () => useProductStore((state) => state.calculateTotalPrice);
export const useCalculateTotalItems = () => useProductStore((state) => state.calculateTotalItems);