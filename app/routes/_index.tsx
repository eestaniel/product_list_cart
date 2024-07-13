import type {MetaFunction} from "@remix-run/node";
import {PrimaryButton} from "~/components/buttons/primary_button/PrimaryButton"
import {CartButton} from "~/components/buttons/cart_button/CartButton"
import {RemoveIcon} from "~/components/icons/Icons"
import {ProductList} from "~/components/product_list/ProductList"
import styles from '../styles/index.module.css'

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
  return (
    <main className={styles.container}>
      {ProductList()}
    </main>
  );
}
