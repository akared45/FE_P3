import React, { useEffect, useState } from "react";
import Button from "../../../components/ui/button";
import Table from "../../../components/ui/table";
import { patientApi } from "../../../services/api";
import styles from "./style.module.scss";
const Patients = () => {
  const [patient, setPatient] = useState([]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    patientApi.getAll().then((res) => {
      const mapped = res.data.map((p) => ({
        id: p.id,
        fullName: p.fullName,
        email: p.email,
        gender: p.gender,
        dateOfBirth: formatDate(p.dateOfBirth),
      }));
      setPatient(mapped);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "Họ và tên", width: 200 },
    { field: "email", headerName: "Địa chỉ email", width: 150 },
    { field: "gender", headerName: "Giới tính", width: 120 },
    { field: "dateOfBirth", headerName: "Ngày sinh", width: 150 },
  ];

  console.log("map", patient);
  return (
    <div className={styles.patient__container}>
      <div style={{ width: "250px", margin: "15px 0px" }}>
        <Button content={"Thêm bệnh nhân"} />
      </div>
      <Table columns={columns} rows={patient} />
    </div>
  );
};

export default Patients;
