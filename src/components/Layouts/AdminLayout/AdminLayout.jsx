import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import HeaderAdmin from "../../HeaderAdmin/HeaderAdmin";
import styles from "./style.module.scss";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className={styles.layoutWrapper}>
      <Sidebar />

      <div className={styles.mainContent}>
        <HeaderAdmin />

        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
