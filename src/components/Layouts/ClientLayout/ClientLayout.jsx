import { useState } from "react";

import Header from "./header/header";
import Footer from "./footer/footer";
import ChatWidget from "./ChatWidget/ChatWidget";
import DoctorChat from "./DoctorChat/DoctorChat";
import PatientChat from "./PatientChat/PatientChat";

import styles from "./style.module.scss";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  const userRole = "patient";

  const [activeChat, setActiveChat] = useState(null);

  const handleOpenDoctorChat = () => setActiveChat("doctor");
  const handleOpenPatientChat = () => setActiveChat("patient");
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
        <ChatWidget
          openDoctorChat={handleOpenDoctorChat}
          openPatientChat={handleOpenPatientChat}
        />

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
