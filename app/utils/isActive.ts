import {useProducts} from "~/store/ProductStore"

export const isActive = (product_name: string) => {
  const products = useProducts();
  return products[product_name] > 0;
}