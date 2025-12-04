import React, { useEffect, useState } from "react";
import Button from "../../../components/ui/button";
import Table from "../../../components/ui/table";
import { patientApi } from "../../../services/api";
const Patients = () => {
  const [patient, setPatient] = useState([]);
  useEffect(() => {
    patientApi.getAll().then((res) => {
      setPatient(res.data);
    });
  }, []);
  return (
    <div>
      <div style={{ width: "250px", margin: "15px 0px" }}>
        <Button content={"Thêm bệnh nhân"} />
      </div>
      <Table />
    </div>
  );
};

export default Patients;
