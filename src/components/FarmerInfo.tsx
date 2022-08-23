import styles from "./FarmerInfo.module.css";
import { FarmerInfoType } from "../types/farmer.types";
import cx from "classnames"; // using this module,  we can have multiple classname for one element

export const FarmerInfo = (farmer: FarmerInfoType) => {
  return (
    <div className={styles.farmerTableListTH}>
      <span className={styles.farmerList}>{farmer.farmer_name.toUpperCase()}</span>
      <span className={styles.farmerList}>{farmer.city.toUpperCase()}</span>
      <span className={styles.farmerList}>{farmer.state.toUpperCase()}</span>
      <span className={cx(styles.farmerList, styles.alignRight)}>
        {farmer.cp_spend.toLocaleString("en-CA", {
          style: "currency",
          currency: "CAD",
        })}
      </span>
      <span className={styles.farmerList}>{farmer.seed_purchases}</span>
    </div>
  );
};
