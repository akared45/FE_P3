import React from "react";
import styles from "./style.module.scss";
import Illustration from "@images/draw.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
const Login = () => {
  return (
    <div className={styles.auth}>
      <div className={styles.auth__illustration}>
        <img src={Illustration} alt="" />
      </div>

      <div className={styles.auth__content}>
        <form className={styles.auth__form}>
          <div className={styles.auth__social}>
            <h3 className="m-0">Đăng nhập với</h3>

            <div className={styles.auth__social_list}>
              <div className={`${styles.auth__social_item}`}>
                <FaFacebookF />
              </div>
              <div className={styles.auth__social_item}>
                <FaTwitter />
              </div>
              <div className={styles.auth__social_item}>
                <FaLinkedinIn />
              </div>
            </div>
          </div>

          <div className={styles.auth__divider}>Hoặc</div>

          <Input placeholder="Email address" name="email" />
          <Input type={"password"} placeholder="Password" name="password" />

          <div className={styles.auth__actions}>
            <input type="checkbox" />
            <p className="m-0">Remember me</p>
            <span className={styles.auth__forgot}>Quên mật khẩu?</span>
          </div>

          <Button content="Đăng nhập" />

          <div className={styles.auth__register}>
            <span>Không có tài khoản?</span>

            <Link to="/dang-ky" className={styles.auth__register_link}>
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
