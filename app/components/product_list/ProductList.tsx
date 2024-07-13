import styles from "./ProductList.module.css";
import data from "~/data.json";
import globals from "../../globals.module.css";
import {Card} from "~/components/card/Card"

export const ProductList = () => {


  return (
    <div className={styles.main_content}>
      <div className={styles.product_list}>
        <h1 className={globals.text_preset_1}>Desserts</h1>
        <ul className={styles.list}>
          {data.map((product, index) => (
            <li key={index} className={`${globals.text_preset_1} ${styles.list}`}>
              <Card product={product}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
