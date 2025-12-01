import React from "react";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import styles from "./style.module.scss";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.main__container}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientLayout;
