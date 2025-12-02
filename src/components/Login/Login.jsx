import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import Illustration from "@images/draw.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthProvider";
const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const [account, setAccount] = useState({ email: "", password: "" });
  console.log(user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("name:", name, "value:", value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = account;
      const res = await login({ email, password });
      if (res.userType === "admin") {
        navigate("/admin");
      } else if (res.userType === "patient") {
        navigate("/");
      } else {
        navigate("/dang-nhap");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__illustration}>
        <img src={Illustration} alt="" />
      </div>

      <div className={styles.auth__content}>
        <form className={styles.auth__form} onSubmit={handleOnSubmit}>
          <div className={styles.auth__social}>
            <h3 className="m-0">Đăng nhập với</h3>
          </div>

          <div className={styles.auth__divider}>Hoặc</div>

          <Input
            placeholder="Email address"
            name="email"
            value={account.email}
            onChange={handleOnChange}
          />

          <Input
            type="password"
            placeholder="Password"
            value={account.password}
            name="password"
            onChange={handleOnChange}
          />

          <div className={styles.auth__actions}>
            <input type="checkbox" />
            <p className="m-0">Remember me</p>
            <span className={styles.auth__forgot}>Quên mật khẩu?</span>
          </div>

          <Button content={"Đăng nhập"} />

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
