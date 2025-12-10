import { useState, useContext } from "react";

import Header from "./header/header";
import Footer from "./footer/footer";
import ChatWidget from "./ChatWidget/ChatWidget";
import DoctorChat from "./DoctorChat/DoctorChat";
import PatientChat from "./PatientChat/PatientChat";
import styles from "./style.module.scss";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
const ClientLayout = () => {
  const { user } = useContext(AuthContext);
  const userRole = user?.userType || user?.role; 
  const [activeChat, setActiveChat] = useState(null);
const handleOpenChat = () => {
      if (userRole === 'doctor') setActiveChat('doctor');
      if (userRole === 'patient') setActiveChat('patient');
  };
  const handleCloseChat = () => setActiveChat(null);
  
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.main__container}>
          <Outlet />
        </div>
      </div>

      <Footer />

      <div className={styles.rightWidgetContainer}>
        <ChatWidget onClick={handleOpenChat} />

        {/* DOCTOR CHAT */}
        {userRole === "doctor" && (
          <DoctorChat
            isOpen={activeChat === "doctor"}
            onClose={handleCloseChat}
          />
        )}

        {/* PATIENT CHAT */}
        {userRole === "patient" && (
          <PatientChat
            isOpen={activeChat === "patient"}
            onClose={handleCloseChat}
          />
        )}
      </div>
    </>
  );
};

export default ClientLayout;
