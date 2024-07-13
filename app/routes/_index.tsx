import type {MetaFunction} from "@remix-run/node";
import {ProductList} from "~/components/product_list/ProductList"
import styles from '../styles/index.module.css'
import {ShoppingCart} from "~/components/shopping_cart/ShoppingCart"
import data from "~/data.json";
import {useEffect} from "react"
import {useLoadData, useProductCart} from "~/store/ProductStore"

export const meta: MetaFunction = () => {
  return [
    {title: "New Remix App"},
    {name: "description", content: "Welcome to Remix!"},
  ];
};

export const loader = () => {
  return null
}
export default function Index() {

  const LoadData = useLoadData()
  const products = useProductCart()

  useEffect(() => {
    if (data) {
      LoadData(data)
    }
  }, []);

  useEffect(() => {
    if (products) {
      console.log(products)

    }
  }, [products]);

  return (
    <main className={styles.container}>
      <ProductList />
      <ShoppingCart />
    </main>
  );
}
