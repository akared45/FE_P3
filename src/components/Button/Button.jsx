import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
const Button = ({ content, isPrimary = true, onClick }) => {
  return (
    <button
      className={classNames(styles.btn, {
        [styles.btn__primary]: isPrimary,
        [styles.btn__outline]: !isPrimary,
      })}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
