import React, { useState } from "react";
import styles from "./style.module.scss";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const Input = ({ type = "text", placeholder, name, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isShowTextOrPassword =
    type === "password" && showPassword ? "text" : type;
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.input__container}>
      <input
        className={styles.inputCommon}
        type={isShowTextOrPassword}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      {isPassword && (
        <div className={styles.secret} onClick={handleShowPassword}>
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
      )}
    </div>
  );
};

export default Input;
