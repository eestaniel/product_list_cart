import {useCallback, useRef, useState} from "react";
import styles from "./CartButton.module.css";
import globals from "~/globals.module.css";
import {AddIcon, IconAddToCart, SubtractIcon} from "~/components/icons/Icons";
import {useAddProduct, useRemoveProduct, useProducts} from "~/store/ProductStore";
import {isActive} from "~/utils/isActive"

interface CartButtonProps {
  product_name: string;
}


export const CartButton = ({
                             product_name,
                           }: CartButtonProps) => {

  /* -------Import States------- */
  const cartButtonRef = useRef(null);
  const addProduct = useAddProduct();
  const removeProduct = useRemoveProduct();
  const products = useProducts();



  const handleAddToCart = useCallback((event: {
    stopPropagation: () => void;
  }) => {
    event.stopPropagation();
    addProduct({product: product_name});
  }, [product_name, addProduct]);

  const handleIncrement = useCallback((event: {
    stopPropagation: () => void;
  }) => {
    event.stopPropagation();
    addProduct({product: product_name})

  }, [product_name, addProduct]);

  const handleDecrement = useCallback((event: {
    stopPropagation: () => void;
  }) => {
    event.stopPropagation();
    removeProduct({product: product_name});
  }, [product_name, removeProduct]);

  return (
    <div ref={cartButtonRef}>
      <button
        className={`
        ${styles.cart_button_container} 
        ${globals.text_preset_4}
        ${isActive(product_name) && styles.active_button}
        `}
        onClick={ isActive(product_name) ? handleAddToCart : handleIncrement}
      >
        {!isActive(product_name) ? (
          <>
            <div className={styles.svg_container}>
              <IconAddToCart/>
            </div>
            <span>Add to Cart</span>
          </>
        ) : (
          <>
            <div onClick={handleDecrement}>
              <SubtractIcon/>
            </div>
            {products[product_name]}
            <div onClick={handleIncrement}>
              <AddIcon/>
            </div>
          </>
        )}
      </button>
    </div>
  );
};
