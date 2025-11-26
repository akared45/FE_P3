import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./style.module.scss";
import Logo from "@images/logo.01.svg";
import { GrMenu } from "react-icons/gr";
import classNames from "classnames";
import { FaPhoneSquareAlt } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import Vie from "@images/vietnam.png";
import Eng from "@images/eng.png";
import { MdKeyboardArrowDown } from "react-icons/md";
const Header = () => {
  const nav = [
    { content: "Cơ sở y tế", href: "#" },
    { content: "Giới thiệu dịch vụ", href: "#" },
    { content: "Đội ngũ bác sĩ", href: "#" },
    { content: "Về chúng tôi", href: "#" },
    { content: "0983310337", href: "#" },
  ];
  const authNav = [
    { content: "Đăng ký", href: "#" },
    { content: "Đăng nhập", href: "#" },
  ];

  const language = [{ country: Vie }, { country: Eng }];

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__start}>
          <a href="#">
            <img className={styles.header__start__img} src={Logo} alt="" />
          </a>
        </div>
        <div className={styles.header__middle}>
          <ul className={styles.header__middle__nav}>
            {nav.map((i, index) => (
              <li className={styles.header__item} key={index}>
                <a
                  className={classNames(styles.header__link, {
                    [styles.header__contact]: i.content === "0983310337",
                  })}
                  href={i.href}
                >
                  {i.content === "0983310337" && <FaPhoneSquareAlt />}
                  {i.content}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.header__end}>
          <div className={styles.header__language}>
            <div className={styles.header__select_lan}>
              <img className={styles.header__country__img} src={Vie} alt="" />
              <MdKeyboardArrowDown />
            </div>
            <div className={styles.dropdown}>
              <div className={styles.item}>
                <img className={styles.item__img} src={Vie} />
                <p>Tiếng việt</p>
              </div>
              <div className={styles.item}>
                <img className={styles.item__img} src={Eng} />
                <p>English</p>
              </div>
            </div>
          </div>

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
        <div className={styles.mobile__menu} onClick={handleOpenToggle}>
          <GrMenu />
        </div>
      </div>
      {isOpen && (
        <div className={styles.header__menu__mobile}>
          <ul className={`p-0 m-0 ${styles.header__mobile__nav}`}>
            {nav.concat(authNav).map((i, index) => (
              <li className={styles.header__item} key={index}>
                <a className={styles.header__link} href={i.href}>
                  {i.content}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Header;
