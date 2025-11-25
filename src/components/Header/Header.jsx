import React from "react";
import { Container } from "react-bootstrap";
import styles from "./style.module.scss";
import Logo from "@images/logo.01.svg";
const Header = () => {
  const nav = [
    { content: "Trang chủ", href: "#" },
    { content: "Giới thiệu dịch vụ", href: "#" },
    { content: "Đội ngũ bác sĩ", href: "#" },
    { content: "Về chúng tôi", href: "#" },
    { content: "Liên hệ", href: "#" },
  ];
  const authNav = [
    { content: "Đăng ký", href: "#" },
    { content: "Đăng nhập", href: "#" },
  ];
  return (
    <section className={styles.header}>
      <Container fluid className={styles.header__container}>
        <div className={styles.header__start}>
          <a href="#">
            <img className={styles.header__start__img} src={Logo} alt="" />
          </a>
        </div>
        <div className={styles.header__middle}>
          <ul className={styles.header__middle__nav}>
            {nav.map((i, index) => (
              <li className={styles.header__item} key={index}>
                <a className={styles.header__link} href={i.href}>
                  {i.content}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.header__end}>
          <ul className={styles.header__middle__nav}>
            {authNav.map((i, index) => (
              <li className={styles.header__item} key={index}>
                <a className={styles.header__link} href={i.href}>
                  {i.content}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default Header;
