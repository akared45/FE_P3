<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> master
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import Illustration from "@images/draw.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
const Register = () => {
=======
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

// Import API và Utils
import api from "@services/api";
import { setAccessToken } from "@utils/authMemory";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. State lưu dữ liệu Form
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State cho checkbox điều khoản
  const [agree, setAgree] = useState(false);

  // 2. Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Hàm Xử lý Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();

    // --- Validate cơ bản phía Frontend ---
    if (!agree) {
      return alert("Vui lòng đồng ý với các điều khoản!");
    }
    if (form.password !== form.confirmPassword) {
      return alert("Mật khẩu nhập lại không khớp!");
    }
    if (form.password.length < 6) {
      return alert("Mật khẩu phải có ít nhất 6 ký tự");
    }

    setLoading(true);

    try {
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
        profile: {
          fullName: form.fullName,
          gender: "Other", 
        },
      };

      const res = await api.register(payload);
      console.log("Register Success:", res);
      const { accessToken } = res.data; 
      if (accessToken) {
        setAccessToken(accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Đăng ký thành công! Đang chuyển hướng...");
        navigate("/");
      } else {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/dang-nhap");
      }

    } catch (error) {
      console.error("Register Error:", error);
      const message = error.response?.data?.message || "Đăng ký thất bại!";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

>>>>>>> master
  return (
    <div className={styles.auth}>
      <div className={styles.auth__illustration}>
        <img src={Illustration} alt="" />
      </div>

      <div className={styles.auth__content}>
<<<<<<< HEAD
        <form className={styles.auth__form}>
          <div className={styles.auth__social}>
            <h3 className="m-0">Đăng ký với</h3>

            <div className={styles.auth__social_list}>
              <div className={styles.auth__social_item}>
                <FaFacebookF />
              </div>
              <div className={styles.auth__social_item}>
                <FaTwitter />
              </div>
              <div className={styles.auth__social_item}>
                <FaLinkedinIn />
              </div>
=======
        <form className={styles.auth__form} onSubmit={handleRegister}>
          <div className={styles.auth__social}>
            <h3 className="m-0">Đăng ký với</h3>
            <div className={styles.auth__social_list}>
              <div className={styles.auth__social_item}><FaFacebookF /></div>
              <div className={styles.auth__social_item}><FaTwitter /></div>
              <div className={styles.auth__social_item}><FaLinkedinIn /></div>
>>>>>>> master
            </div>
          </div>

          <div className={styles.auth__divider}>hoặc</div>

<<<<<<< HEAD
          <Input placeholder="Email address" />
          <Input type={"password"} placeholder="Password" />
          <Input type={"password"} placeholder="Confirm password" />

          <div className={styles.auth__actions_regis}>
            <input type="checkbox" />
            <p className="m-0">Tôi đã đọc và đồng ý các điều khoản</p>
          </div>

          <Button content="Đăng ký" />

          <div className={styles.auth__register}>
            <span>Đã có tài khoản?</span>

=======
          <Input
            placeholder="Họ và tên"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          
          <Input
            placeholder="Tên đăng nhập (Username)"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            placeholder="Email address"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className={styles.auth__actions_regis}>
            <input 
              type="checkbox" 
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <p className="m-0">Tôi đã đọc và đồng ý các điều khoản</p>
          </div>

          <Button content={loading ? "Đang xử lý..." : "Đăng ký"} />

          <div className={styles.auth__register}>
            <span>Đã có tài khoản?</span>
>>>>>>> master
            <Link to="/dang-nhap" className={styles.auth__register_link}>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> master
