import styles from "./Card.module.css";
import { getImageSize } from "~/utils/getImageSize";
import { CartButton } from "~/components/buttons/cart_button/CartButton";
import globals from "~/styles/globals.module.css";
import { useIsProductInCart } from "~/store/ProductStore";
import { motion } from "framer-motion";

interface CardProps {
  product: any;
}

export const Card = ({ product }: CardProps) => {
  const isActive = useIsProductInCart();

  return (
    <>
      <motion.div className={styles.img_button_group}
      whileHover={{ scale: 1.02 }}
      >
        <img
          className={`${isActive(product.name) && styles.active}`}
          src={product.image[getImageSize() as any]}
          alt={product.name}
          loading="lazy"
        />
        <div className={styles.button_container}>
          <CartButton product_name={product.name} />
        </div>
      </motion.div>
      <div className={styles.item_info_group}>
        <p className={globals.text_preset_4}>{product.category}</p>
        <p className={globals.text_preset_3}>{product.name}</p>
        <p className={`${globals.text_preset_3} ${styles.price}`}>
          ${product.price.toFixed(2)}
        </p>
      </div>
    </>
  );
};
