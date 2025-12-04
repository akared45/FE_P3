import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import BreadCrumb from "../../../components/ui/bread-crumb";
import DoctorModal from "../../../components/sections/doctor-modal/doctorModal";
import { doctorApi } from "../../../services/api";
import DoctorList from "../../../components/sections/doctor-list/doctorList";
const DoctorPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [filter, setFilter] = useState("Tất cả");

  // const specialtyList = ["Tất cả", ...new Set(doctors.map((s) => s.specialty))];

  // const filteredDoctors =
  //   filter === "Tất cả"
  //     ? doctors
  //     : doctors.filter((s) => s.specialty === filter);

  const handleOpenModal = (doctorData) => {
    setDoctor(doctorData);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    doctorApi.getAll();
  }, []);

  return (
    <section className={styles.doctors__team_container}>
      <div className={styles.doctors__team_bread}>
        <BreadCrumb
          items={[
            { label: "Trang chủ", to: "/" },
            { label: "Đội ngũ bác sĩ", to: "/doi-ngu-bac-si" },
          ]}
        />
      </div>
      <div className={styles.doctors__team_card}>
        <DoctorList onOpenModal={handleOpenModal} />
      </div>
      {isOpen && doctor && (
        <DoctorModal data={doctor} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default DoctorPage;
