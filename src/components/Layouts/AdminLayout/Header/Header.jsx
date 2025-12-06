import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import { FaBell } from "react-icons/fa";
import { AuthContext } from "@providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Modal from "../../../ui/modal";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import {authApi} from "@services/api";
const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  

  const handleOpenOptions = () => {
    setIsOpen(!isOpen);
  };

 const handleLogout = () => {
    setIsOpen(false);
    setOpenModal(true);
  };
  const confirmLogout = async () => {
    try {
  
      await authApi.logout(); 
    } catch (error) {
      console.error("Lỗi khi gọi API logout:", error);
    } finally {
    
      logout(); 
      setOpenModal(false);
      navigate("/dang-nhap");
    }
  };
  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/admin/profile");
  };

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.left}>
        <div className={styles.search}>
          <div className={styles.search__icon}>
            <SearchIcon />
          </div>
          <input
            className={styles.search__input}
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className={styles.right} onClick={handleOpenOptions}>
        <div className={styles.headerIcon}>
          <FaBell />
        </div>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img src={user?.avatarUrl} alt="" />
          </div>
          <div className={styles.inf}>
            <p className={styles.info_name}>{user?.fullName}</p>
            <p className={styles.info_role}>{user?.userType}</p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.options__admin}>
          <div className={styles.options__item} onClick={handleProfileClick}>
            <AccountCircleIcon />
            <span>Profile</span>
          </div>

          <div className={styles.options__item}>
            <LogoutIcon />
            <span onClick={handleLogout}>Đăng xuất</span>
          </div>
        </div>
      )}
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="Đăng xuất"
          message="Bạn có chắc chắn muốn đăng xuất không?"
          onConfirm={confirmLogout}
        />
      )}
    </header>
  );
};

export default Header;
