import React from "react";
import styles from "./style.module.scss";
const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          <span style={styles.footer__title}>
            Công ty Cổ phần Công nghệ Bác Sỹ Bên Bạn
          </span>
        </div>
        <div className={styles.footer__middle}>
          <div className={styles.footer__middle__start}>
            <p>Phòng khám Bác Sỹ Gia Đình Doctor4U</p>
            <p>
              Tòa nhà Imperial Suites, 71 Vạn Phúc, Phường Ngọc Hà, Thành phố Hà
              Nội
            </p>
          </div>
          <div className={styles.footer__middle__center}>
            <p>Email: care@doctor4u.vn</p>
            <p>
              Tổng đài: 024 32 212 212 | Hotline: 0934 38 12 12 - 0936 56 12 12
            </p>
          </div>
          <div className={styles.footer__middle__end}></div>
        </div>
        <div className={styles.footer__bottom}></div>
      </div>
    </footer>
  );
};

export default Footer;
