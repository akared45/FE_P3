<<<<<<< HEAD
import React from "react";
import styles from "./style.module.scss";
import Illustration from "@images/draw.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
const Login = () => {
=======
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Illustration from "@images/draw.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import api from "@services/api";
import { setAccessToken } from "@utils/authMemory";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestApiCall = async () => {

    try {
      setIsRefreshing(true);
      console.log("⏰ Đồng hồ về 0! Token cũ đã hết hạn. Đang gọi API /users/me để thử...");
      const res = await api.getMe(); 
      
      console.log("✅ API thành công! Interceptor đã hoạt động tốt.");
      console.log("User data:", res.data);

      setTimeLeft(10); 

    } catch (error) {
      console.error("❌ API thất bại (Interceptor không cứu được):", error);
          console.log(res.data);
      setTimeLeft(null);
      alert("Phiên đăng nhập hết hạn hẳn.");
    } finally {
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    if (timeLeft === null || isRefreshing) return;
    if (timeLeft === 0) {
      handleTestApiCall();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isRefreshing]);
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await api.login(form);
    const { accessToken, expiresIn } = res.data.auth;
    
    setAccessToken(accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setTimeLeft(expiresIn);
    
    // Debug: kiểm tra xem request có credentials
    console.log("✅ Login thành công!");
    console.log("📨 Response headers:", res.headers);
    console.log("🍪 Cookies sẽ được browser tự động lưu (không thấy trong JS)");
    
    // Test ngay: gọi API cần auth để xem interceptor hoạt động
    setTimeout(async () => {
      try {
        const userInfo = await api.getMe();
        console.log("✅ Gọi API thành công sau login:", userInfo.data);
      } catch (error) {
        console.error("❌ Lỗi gọi API sau login:", error);
      }
    }, 1000);
    
    alert(`Đăng nhập thành công!`);
  } catch (error) {
    console.error("❌ Login thất bại:", error);
    alert("Sai email hoặc mật khẩu!");
  } finally {
    setLoading(false);
  }
};

  const formatTime = (seconds) => {
    if (seconds === null) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
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
=======
        <form className={styles.auth__form} onSubmit={handleLogin}>
          
          {/* --- KHU VỰC HIỂN THỊ TRẠNG THÁI TEST --- */}
          {(timeLeft !== null || isRefreshing) && (
            <div style={{ 
                marginBottom: '20px', 
                padding: '15px', 
                backgroundColor: isRefreshing ? '#fffaf0' : '#ebf8ff', 
                border: '1px solid',
                borderColor: isRefreshing ? '#ed8936' : '#4299e1',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#2d3748'
            }}>
              {isRefreshing ? (
                <div style={{fontWeight: 'bold', color: '#dd6b20'}}>
                  🔄 Đang lấy Token mới... Vui lòng chờ...
                </div>
              ) : (
                <>
                  <div>Access Token hết hạn sau:</div>
                  <div style={{fontSize: '2em', fontWeight: 'bold', color: '#3182ce'}}>
                    {formatTime(timeLeft)}
                  </div>
                  <div style={{fontSize: '0.8em', marginTop: '5px', fontStyle: 'italic'}}>
                    (Sẽ tự động gia hạn khi về 00:00)
                  </div>
                </>
              )}
            </div>
          )}
          {/* ----------------------------------- */}

          <div className={styles.auth__social}>
             <h3 className="m-0">Đăng nhập với</h3>
             {/* ... Social Icons ... */}
>>>>>>> master
          </div>

          <div className={styles.auth__divider}>Hoặc</div>

<<<<<<< HEAD
          <Input placeholder="Email address" name="email" />
          <Input type={"password"} placeholder="Password" name="password" />
=======
          <Input
            placeholder="Email address"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
>>>>>>> master

          <div className={styles.auth__actions}>
            <input type="checkbox" />
            <p className="m-0">Remember me</p>
            <span className={styles.auth__forgot}>Quên mật khẩu?</span>
          </div>

<<<<<<< HEAD
          <Button content="Đăng nhập" />

          <div className={styles.auth__register}>
            <span>Không có tài khoản?</span>

            <Link to="/dang-ky" className={styles.auth__register_link}>
              Đăng ký
            </Link>
=======
          <Button content={loading ? "Đang xử lý..." : "Đăng nhập"} />

          <div className={styles.auth__register}>
            <span>Không có tài khoản?</span>
            <Link to="/dang-ky" className={styles.auth__register_link}>Đăng ký</Link>
>>>>>>> master
          </div>
        </form>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> master
