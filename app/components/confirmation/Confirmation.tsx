import styles from "./Confirmation.module.css"
import globals from "~/styles/globals.module.css"
import React, {useEffect} from "react"
import {ConfirmationIcon} from "~/components/icons/Icons"
import {ShoppingCart} from "~/components/shopping_cart/ShoppingCart"
import {PrimaryButton} from "~/components/buttons/primary_button/PrimaryButton"
import {useResetCart, useSetDisplayConfirmation} from "~/store/ProductStore"


interface ConfirmationProps {
  display: boolean;
}


export const Confirmation = ({display}: ConfirmationProps) => {
  const resetCart = useResetCart();
  const setDisplayConfirmation = useSetDisplayConfirmation();

  useEffect(() => {
    if (display) {
      window.scrollTo(0, 0);
    }
  }, [display]);

  if (!display) {
    return null;
  }

  const handleNewOrder = () => {
    resetCart();
    setDisplayConfirmation(false);
    document.getElementById('modal-root')?.classList.remove('modal_open');

  }

  return (
    <div className={styles.confirmation_container}>
      <header className={styles.header_group}>
        <div className={styles.svg_container}>
          <ConfirmationIcon />
        </div>
        <div className={styles.text_group}>
          <h1 className={globals.text_preset_1}>Order Confirmed</h1>
          <p className={globals.text_preset_3}>
            We hope you enjoy your food!
          </p>
        </div>
      </header>

      <section>
        <ShoppingCart confirmation={true}/>
      </section>

      <footer>

        <PrimaryButton label={"Start New Order"}
                       onClick={handleNewOrder}/>
      </footer>

    </div>
  );
};
