import type {MetaFunction} from "@remix-run/node";
import {ProductList} from "~/components/product_list/ProductList"
import styles from '../styles/index.module.css'
import {ShoppingCart} from "~/components/shopping_cart/ShoppingCart"
import data from "~/data.json";
import {useCallback, useEffect, useState} from "react"
import {useLoadData, useProductCart, useDisplayConfirmation} from "~/store/ProductStore"
import  {Confirmation} from "~/components/confirmation/Confirmation"
import {Modal} from "~/components/modal/Modal"


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
  const displayConfirmation = useDisplayConfirmation()

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

  useEffect(() => {
    if (displayConfirmation) {
      // add styles.modal_open to body class
      document.body.classList.add('modal_open');
    }

  }, [displayConfirmation]);




  return (
    <main className={`${styles.container} ${displayConfirmation && styles.modal_open}`}>
      <Modal isOpen={displayConfirmation}>
        <Confirmation display={displayConfirmation}/>
      </Modal>
      <ProductList />
      <ShoppingCart />
    </main>
  );
}
