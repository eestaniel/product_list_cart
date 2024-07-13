import styles from "./ShoppingCart.module.css"
import globals from "~/globals.module.css"
import {CarbonNeutralIcon, RemoveIcon} from "~/components/icons/Icons"
import {useProductCart, useCalculateTotalPrice, useCalculateTotalItems} from "~/store/ProductStore"
import {PrimaryButton} from "~/components/buttons/primary_button/PrimaryButton"

export const ShoppingCart = () => {

  const products = useProductCart()
  const calculateTotal = useCalculateTotalPrice()
  const calculateTotalItems = useCalculateTotalItems()

 return (
  <div className={styles.cart_container}>
    <h3 className={globals.text_preset_2}>Your Cart ({calculateTotalItems()})</h3>
    <ul className={styles.added_items_list}>
      {Object.keys(products).map((name, index) => (
        <>
          <li key={index} className={styles.added_item}>
            <div className={styles.name_quantity_price_group}>
              <h4 className={globals.text_preset_4_bold}>{name}</h4>
              <div className={styles.quantity_price_group}>
                <p
                  className={`${globals.text_preset_4_bold} ${styles.quantity}`}>{products[name].quantity}x</p>
                <p
                  className={`${globals.text_preset_4} ${styles.price_total}`}>@ {products[name].price.toFixed(2)}</p>
                <p
                  className={`${globals.text_preset_4_bold} ${styles.price_total}`}>{products[name].total.toFixed(2)}</p>
              </div>
            </div>
            <div className={styles.remove_svg_container}>
              <RemoveIcon/>
            </div>
          </li>
          <hr className={styles.divider}/>
        </>
      ))}
    </ul>
    <div className={styles.order_total_group}>
      <p className={globals.text_preset_4}>Order Total</p>
      <p className={globals.text_preset_2}>${calculateTotal().toFixed(2)}</p>
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
    <PrimaryButton label={"Confirm Order"}/>
  </div>
 );
};
