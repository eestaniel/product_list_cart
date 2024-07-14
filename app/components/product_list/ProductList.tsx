import styles from "./ProductList.module.css";
import globals from "../../styles/globals.module.css";
import {Card} from "~/components/card/Card";
import {useProductData} from "~/store/ProductStore";
import {motion} from "framer-motion";


export const ProductList = () => {
  const productData = useProductData();

  return (

    <motion.div className={styles.main_content}>
      <div className={styles.product_list}>
        <h1 className={globals.text_preset_1}>Desserts</h1>
        <ul
          className={styles.list_container}
        >
          {Object.keys(productData).map((name, i) => (
            <motion.li
              key={name}
              className={`${globals.text_preset_1} ${styles.list_item}`}
              initial={{x: 100, opacity: 0}}
              animate={{x: 0, opacity: 1, transition: {delay: i * 0.07}}}
            >
              <Card product={productData[name]}/>
            </motion.li>

          ))}
        </ul>
      </div>
    </motion.div>
  );
};
