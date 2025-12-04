import React, { useEffect, useState } from "react";
import Table from "@components/ui/table";
import Button from "@components/ui/button";
import { doctorApi } from "@services/api";
const Doctors = () => {
  const [doctor, setDoctor] = useState([]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    doctorApi.getAll().then((res) => {
      console.log(res);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "Họ và tên", width: 200 },
    { field: "email", headerName: "Địa chỉ email", width: 150 },
    { field: "gender", headerName: "Giới tính", width: 120 },
    { field: "dateOfBirth", headerName: "Ngày sinh", width: 150 },
  ];
  return (
    <div>
      <div style={{ width: "250px", margin: "15px 0px" }}>
        <Button content={"Thêm bác sĩ mới"} />
      </div>

      <Table columns={columns} />
    </div>
  );
};

export default Doctors;
