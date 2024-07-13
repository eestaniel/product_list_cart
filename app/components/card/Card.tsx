import styles from "./Card.module.css"
import {getImageSize} from "~/utils/getImageSize"
import {CartButton} from "~/components/buttons/cart_button/CartButton"
import globals from "~/globals.module.css"
import {useEffect, useState} from "react"
import {useProductCart, useIsProductInCart} from "~/store/ProductStore"


interface CardProps {
  product: any

}


export const Card = ({product}: CardProps) => {
  const products = useProductCart();
  const [renderAmount, setRenderAmount] = useState(0);
  const isActive = useIsProductInCart();


  return (
    <>
      <div className={styles.img_button_group}>
        <img
          className={`${isActive(product.name) && styles.active}`}
          src={product.image[getImageSize() as any]}
          alt={product.name}
        />
        <div className={styles.button_container}>
          <CartButton product_name={product.name}/>
        </div>
      </div>
      <div className={styles.item_info_group}>
        <p className={globals.text_preset_4}>{product.category}</p>
        <p className={globals.text_preset_3}>{product.name}</p>
        <p
          className={`${globals.text_preset_3} ${styles.price}`}>${product.price.toFixed(2)}</p>
      </div>
    </>
  )
    ;
};
