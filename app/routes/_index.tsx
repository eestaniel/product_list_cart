import { json, MetaFunction, LoaderFunction } from "@remix-run/node";
import { ProductList } from "~/components/product_list/ProductList";
import { useLoaderData } from "@remix-run/react";
import styles from '../styles/index.module.css';
import { ShoppingCart } from "~/components/shopping_cart/ShoppingCart";
import data from "~/data.json";
import { useEffect, useState } from "react";
import {
  useDisplayConfirmation,
  useLoadData,
  useProductCart
} from "~/store/ProductStore";
import { Confirmation } from "~/components/confirmation/Confirmation";
import { Modal } from "~/components/modal/Modal";
import { motion } from "framer-motion";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = () => {
  return json(data);
};

export default function Index() {
  const LoadData = useLoadData();
  const loadedData = useLoaderData<typeof data>();
  const products = useProductCart();
  const displayConfirmation = useDisplayConfirmation();
  const [isProductListVisible, setIsProductListVisible] = useState(false);

  useEffect(() => {
    if (loadedData) {
      LoadData(loadedData);
    }
  }, [loadedData]);

  useEffect(() => {
    if (displayConfirmation) {
      document.body.classList.add('modal_open');
    } else {
      document.body.classList.remove('modal_open');
    }
  }, [displayConfirmation]);

  return (
    <main className={`${styles.container} ${displayConfirmation && styles.modal_open}`}>
      <Modal isOpen={displayConfirmation}>
        <Confirmation display={displayConfirmation} />
      </Modal>
      <ProductList />
      <ShoppingCart />
    </main>
  );
}
