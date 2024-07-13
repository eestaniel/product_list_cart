import styles from "./ShoppingCart.module.css"
import globals from "~/styles/globals.module.css"
import {CarbonNeutralIcon, RemoveIcon, EmptyCartIcon} from "~/components/icons/Icons"
import {
  useCalculateTotalItems,
  useCalculateTotalPrice,
  useProductCart,
  useProductData,
  useSetDisplayConfirmation,
  useRemoveFromCart
} from "~/store/ProductStore"
import {PrimaryButton} from "~/components/buttons/primary_button/PrimaryButton"
import React from "react"
import { motion } from "framer-motion"


interface ShoppingCartProps {
  confirmation?: boolean;

}


export const ShoppingCart = ({confirmation = false}: ShoppingCartProps) => {

  const products = useProductCart()
  const calculateTotal = useCalculateTotalPrice()
  const calculateTotalItems = useCalculateTotalItems()
  const setDisplayConfirmation = useSetDisplayConfirmation()
  const productData = useProductData()
  const removeFromCart = useRemoveFromCart()

  const itemConfirmationDisplay = (name: string) => {
    if (!confirmation) {
      return (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`${styles.name_quantity_price_group}`}>
            <h4 className={globals.text_preset_4_bold}>{name}</h4>
            <div className={styles.quantity_price_group}>
              <p
                className={`${globals.text_preset_4_bold} ${styles.quantity}`}>{products[name].quantity}x</p>
              <p
                className={`${globals.text_preset_4} ${styles.price_total}`}>@ ${products[name].price.toFixed(2)}</p>
              <p
                className={`${globals.text_preset_4_bold} ${styles.price_total}`}>${products[name].total.toFixed(2)}</p>
            </div>
          </motion.div>
          <div className={styles.remove_svg_container}
                onClick={() => removeFromCart(name)}
          >
            <RemoveIcon/>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className={`${styles.item_confirmation_group}`}>
            <div className={styles.img_header_group}>
              <img src={productData[name].image['thumbnail']} alt=""/>
              <div className={styles.name_quantity_price_group}>
                <h4 className={globals.text_preset_4_bold}>{name}</h4>
                <div className={styles.quantity_price_group}>
                  <p
                    className={`${globals.text_preset_4_bold} ${styles.quantity}`}>{products[name].quantity}x</p>
                  <p
                    className={`${globals.text_preset_4} ${styles.price_total}`}>@ {products[name].price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          <p>${products[name].total.toFixed(2)}</p>
        </>
      )
    }
  }

  const emptyDisplay = () => {
    return(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${styles.cart_container}`}>
        <h3 className={globals.text_preset_2}>
          Your Cart ({calculateTotalItems()})
        </h3>
        <div className={styles.empty_placeholder}>
          <EmptyCartIcon/>
          <p className={globals.text_preset_4_bold}>Your added items will appear here</p>
        </div>


      </motion.div>
    )
  }

  const regularDisplay = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}

        className={`${styles.cart_container}`}>
        <h3 className={globals.text_preset_2}>Your Cart
          ({calculateTotalItems()})</h3>
        <ul
          className={`${styles.added_items_list} ${confirmation && styles.confirmation_list}`}>
          {Object.keys(products).map((name, index) => (
            <React.Fragment key={index}>
              <li className={styles.added_item}>
                {itemConfirmationDisplay(name)}
              </li>
              <hr className={styles.divider}/>
            </React.Fragment>
          ))}
        </ul>
        <hr className={styles.main_divider}/>
        <div
          className={`${styles.order_total_group}`}>
          <p className={globals.text_preset_4}>Order Total</p>
          <p
            className={globals.text_preset_2}>${calculateTotal().toFixed(2)}</p>
        </div>
        <div className={styles.carbon_neutral_container}>
          <div className={styles.icon_text_group}>
            <div className={styles.svg_container}>
              <CarbonNeutralIcon/>
            </div>
            <p className={globals.text_preset_4}>
              This is a <span
              className={globals.text_preset_4_bold}>carbon-neutral</span> delivery
            </p>
          </div>
        </div>
        <PrimaryButton label={"Confirm Order"}
                       onClick={() => setDisplayConfirmation(true)}/>
      </motion.div>
    )
  }

  const confirmationDisplay = () => {
    return (
      <>
        <motion.div
          className={`${styles.cart_container} ${styles.confirmation_cart_container}`}>
          <ul
            className={`${styles.added_items_list} `}>
            {Object.keys(products).map((name, index) => (
              <React.Fragment key={index}>
                <li className={styles.added_item}>
                  {itemConfirmationDisplay(name)}
                </li>
                <hr className={styles.divider}/>
              </React.Fragment>
            ))}
          </ul>
          <hr className={styles.main_divider}/>
          <div
            className={`${styles.order_total_group}`}>
            <p className={globals.text_preset_4}>Order Total</p>
            <p
              className={globals.text_preset_2}>${calculateTotal().toFixed(2)}</p>
          </div>

        </motion.div>
      </>

    )
  }

  return (
    <>

      {!confirmation ? (
          <>{Object.keys(products).length === 0 ? emptyDisplay() : regularDisplay()}</>
        )
        :
        <>{confirmationDisplay()}</>
      }
    </>)
    ;
};
