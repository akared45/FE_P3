import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import Logo from "@images/logo.01.svg";
import { GrMenu } from "react-icons/gr";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Vie from "@images/vietnam.png";
import Eng from "@images/eng.png";
import classNames from "classnames";
import { AuthContext } from "../../contexts/AuthProvider";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const nav = [
    { content: "Giới thiệu dịch vụ", to: "#" },

    { content: "Đội ngũ bác sĩ", to: "#" },
    { content: "Về chúng tôi", to: "#" },
    { content: "0983310337", to: "#" },
  ];

  const authNav = user
    ? [{ content: `Hi ${user.username}`, to: "/profile" }]
    : [
        { content: "Đăng ký", to: "/dang-ky" },
        { content: "Đăng nhập", to: "/dang-nhap" },
      ];

  // Click ngoài đóng dropdown user
  const handleClickOutside = (e) => {
    if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
      setIsUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {/* Logo */}
        <div className={styles.header__start}>
          <Link to="/">
            <img className={styles.header__start__img} src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* NAV PC */}
        <div className={styles.header__middle}>
          <ul className={styles.header__middle__nav}>
            {nav.map((item, index) => (
              <li className={styles.header__item} key={index}>
                <Link
                  className={classNames(styles.header__link, {
                    [styles.header__contact]: item.content === "0983310337",
                  })}
                  to={item.to}
                >
                  {item.content === "0983310337" && <FaPhoneSquareAlt />}
                  {item.content}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LANGUAGE + AUTH */}
        <div className={styles.header__end}>
          {/* Language */}
          <div className={styles.header__language}>
            <div
              className={styles.header__select_lan}
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <img
                className={styles.header__country__img}
                src={Vie}
                alt="Vie"
              />
              <MdKeyboardArrowDown />
            </div>
            {isLanguageOpen && (
              <div className={styles.dropdown}>
                <div className={styles.item}>
                  <img className={styles.item__img} src={Vie} alt="Vie" />
                  <p>Tiếng Việt</p>
                </div>
                <div className={styles.item}>
                  <img className={styles.item__img} src={Eng} alt="Eng" />
                  <p>English</p>
                </div>
              </div>
            )}
          </div>

          {/* Auth / User */}
          <ul className={styles.header__middle__nav}>
            {authNav.map((item, index) =>
              user ? (
                <li
                  className={styles.header__item}
                  key={index}
                  ref={userMenuRef}
                  style={{ position: "relative" }}
                >
                  <div
                    className={styles.header__link}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    {item.content} <MdKeyboardArrowDown />
                  </div>

                  {isUserMenuOpen && (
                    <div className={styles.header__dropdown_menu}>
                      <Link
                        className={styles.header__dropdown_link}
                        to="/profile"
                      >
                        Profile
                      </Link>
                      <span
                        className={styles.header__dropdown_link}
                        onClick={logout}
                      >
                        Logout
                      </span>
                    </div>
                  )}
                </li>
              ) : (
                <li className={styles.header__item} key={index}>
                  <Link className={styles.header__link} to={item.to}>
                    {item.content}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* ICON MOBILE */}
        <div
          className={styles.mobile__menu}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <GrMenu />
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <div className={styles.header__menu__mobile}>
          <ul className={`p-0 m-0 ${styles.header__mobile__nav}`}>
            {nav.concat(authNav).map((item, index) => (
              <li className={styles.header__item} key={index}>
                <Link className={styles.header__link} to={item.to}>
                  {item.content}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
