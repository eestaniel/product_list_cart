import styles from "./ProductList.module.css";
import globals from "../../styles/globals.module.css";
import {Card} from "~/components/card/Card"
import {useProductData} from "~/store/ProductStore"
import {useNavigation} from "react-router"


export const ProductList = () => {
  const productData = useProductData()


  return (
    <div className={styles.main_content}>

      <div className={styles.product_list}>
        <h1 className={globals.text_preset_1}>Desserts</h1>
        <ul className={styles.list_container}>
          {Object.keys(productData).map((name, index) => {
            return (
              <li key={index}
                  className={`${globals.text_preset_1} ${styles.list_item}`}>
                <Card product={productData[name]}/>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};
