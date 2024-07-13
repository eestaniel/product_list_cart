import { useState, useEffect, useRef } from "react";
import styles from "./CartButton.module.css";
import globals from '~/globals.module.css';
import { IconAddToCart, SubtractIcon, AddIcon } from "~/components/icons/Icons";

export const CartButton = () => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(1);
  const cartButtonRef = useRef(null);

  const handleIncrement = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    setValue(value + 1);
  };

  const handleDecrement = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleClickOutside = (event: { target: any; }) => {
    if (cartButtonRef.current && !cartButtonRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={cartButtonRef}>
      <button
        className={`
        ${styles.cart_button_container} 
        ${globals.text_preset_4}
        ${active && styles.active_button}
        `}
        onClick={() => setActive(!active)}
      >
        {!active ? (
          <>
            <div className={styles.svg_container}>
              <IconAddToCart />
            </div>
            <span>Add to Cart</span>
          </>
        ) : (
          <>
            <div onClick={handleDecrement}>
              <SubtractIcon />
            </div>
            {value}
            <div onClick={handleIncrement}>
              <AddIcon />
            </div>
          </>
        )}
      </button>
    </div>
  );
};
