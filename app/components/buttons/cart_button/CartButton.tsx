import { useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CartButton.module.css";
import globals from "~/styles/globals.module.css";
import { AddIcon, IconAddToCart, SubtractIcon } from "~/components/icons/Icons";
import {
  useAddProduct,
  useIsProductInCart,
  useProductCart,
  useRemoveProduct,
} from "~/store/ProductStore";

interface CartButtonProps {
  product_name: string;
}

export const CartButton = ({ product_name }: CartButtonProps) => {
  const cartButtonRef = useRef(null);
  const addProduct = useAddProduct();
  const removeProduct = useRemoveProduct();
  const ProductCart = useProductCart();
  const isActive = useIsProductInCart();

  const handleAddToCart = useCallback((event) => {
    event.stopPropagation();
    addProduct(product_name);
  }, [product_name, addProduct]);

  const handleIncrement = useCallback((event) => {
    event.stopPropagation();
    addProduct(product_name);
  }, [product_name, addProduct]);

  const handleDecrement = useCallback((event) => {
    event.stopPropagation();
    removeProduct(product_name);
  }, [product_name, removeProduct]);

  return (
    <div ref={cartButtonRef}>
      <AnimatePresence mode={'wait'}>
        {!isActive(product_name) ? (
          <motion.div
            key="add-to-cart"
            className={`${styles.cart_button_container} ${globals.text_preset_4}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.05 }}}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.05 }}}
            onClick={handleAddToCart}
          >
            <div className={styles.svg_container}>
              <IconAddToCart />
            </div>
            <span className={globals.text_preset_4_bold}>Add to Cart</span>
          </motion.div>
        ) : (
          <motion.div
            key="increment-decrement"
            className={`${styles.cart_button_container} ${globals.text_preset_4} ${styles.active_button}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.05 }}}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.05 }}}
          >
            <motion.div onClick={handleDecrement} whileHover={{ scale: 1.1 }}>
              <SubtractIcon />
            </motion.div>
            <motion.span
              key={ProductCart[product_name].quantity} // key change triggers re-animation
              className={globals.text_preset_4_bold}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200 } }}
              exit={{ y: 10, opacity: 0, transition: { duration: 0.05 } }}
            >
              {ProductCart[product_name].quantity}
            </motion.span>
            <motion.div onClick={handleIncrement} whileHover={{ scale: 1.1 }}>
              <AddIcon />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
