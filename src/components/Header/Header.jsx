import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./style.module.scss";
import Logo from "@images/logo.01.svg";
import { GrMenu } from "react-icons/gr";
import classNames from "classnames";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Vie from "@images/vietnam.png";
import Eng from "@images/eng.png";
import { Link } from "react-router-dom"; // ⬅️ thêm dòng này

const Header = () => {
  const nav = [
    { content: "Cơ sở y tế", to: "#" },
    { content: "Giới thiệu dịch vụ", to: "#" },
    { content: "Đội ngũ bác sĩ", to: "#" },
    { content: "Về chúng tôi", to: "#" },
    { content: "0983310337", to: "#" },
  ];

  const authNav = [
    { content: "Đăng ký", to: "/dang-ky" },
    { content: "Đăng nhập", to: "/dang-nhap" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__start}>
          <Link to="/">
            <img className={styles.header__start__img} src={Logo} alt="" />
          </Link>
        </div>

        {/* NAV PC */}
        <div className={styles.header__middle}>
          <ul className={styles.header__middle__nav}>
            {nav.map((i, index) => (
              <li className={styles.header__item} key={index}>
                <Link
                  className={classNames(styles.header__link, {
                    [styles.header__contact]: i.content === "0983310337",
                  })}
                  to={i.to}
                >
                  {i.content === "0983310337" && <FaPhoneSquareAlt />}
                  {i.content}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LANGUAGE + AUTH */}
        <div className={styles.header__end}>
          <div className={styles.header__language}>
            <div className={styles.header__select_lan}>
              <img className={styles.header__country__img} src={Vie} alt="" />
              <MdKeyboardArrowDown />
            </div>

            <div className={styles.dropdown}>
              <div className={styles.item}>
                <img className={styles.item__img} src={Vie} alt="" />
                <p>Tiếng Việt</p>
              </div>
              <div className={styles.item}>
                <img className={styles.item__img} src={Eng} alt="" />
                <p>English</p>
              </div>
            </div>
          </div>

          <ul className={styles.header__middle__nav}>
            {authNav.map((i, index) => (
              <li className={styles.header__item} key={index}>
                <Link className={styles.header__link} to={i.to}>
                  {i.content}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ICON MOBILE */}
        <div className={styles.mobile__menu} onClick={handleOpenToggle}>
          <GrMenu />
        </div>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className={styles.header__menu__mobile}>
          <ul className={`p-0 m-0 ${styles.header__mobile__nav}`}>
            {nav.concat(authNav).map((i, index) => (
              <li className={styles.header__item} key={index}>
                <Link className={styles.header__link} to={i.to}>
                  {i.content}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Header;
