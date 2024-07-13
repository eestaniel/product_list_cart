import {useCallback, useRef} from "react";
import styles from "./CartButton.module.css";
import globals from "~/styles/globals.module.css";
import {AddIcon, IconAddToCart, SubtractIcon} from "~/components/icons/Icons";
import {
  useAddProduct,
  useIsProductInCart,
  useProductCart,
  useRemoveProduct
} from "~/store/ProductStore";


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
  const ProductCart = useProductCart();
  const isActive = useIsProductInCart();

  const handleAddToCart = useCallback((event: {
    stopPropagation: () => void;
  }) => {
    event.stopPropagation();
    addProduct(product_name)
  }, [product_name, addProduct]);

  const handleIncrement = useCallback((event: {
    stopPropagation: () => void;
  }) => {

    event.stopPropagation();
    addProduct(product_name)
  }, [product_name, addProduct]);

  const handleDecrement = useCallback((event: {
    stopPropagation: () => void;
  }) => {
    event.stopPropagation();
    removeProduct(product_name);
  }, [product_name, removeProduct]);

  return (
    <div ref={cartButtonRef}>
      <div
        className={`
        ${styles.cart_button_container} 
        ${globals.text_preset_4}
        ${isActive(product_name) && styles.active_button}
        `}
        onClick={!isActive(product_name) ? handleAddToCart : undefined}
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
            <span>{ProductCart[product_name].quantity}</span>
            <div onClick={handleIncrement}>
              <AddIcon/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
