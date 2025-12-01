import React from "react";
import styles from "./style.module.scss";
import { FaBell } from "react-icons/fa";
const HeaderAdmin = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.left}>
        <h2 className={styles.title}>Admin Dashboard</h2>
      </div>

      <div className={styles.right}>
        <div className={styles.headerIcon}>
          <FaBell />
        </div>
        <div className={styles.profile}>
          <div className={styles.avatar}>HT</div>
          <div className={styles.inf}>
            <p className={styles.info_name}>Hieu Tran</p>
            <p className={styles.info_role}>Administartor</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
