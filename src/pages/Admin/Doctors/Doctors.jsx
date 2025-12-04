import React from "react";
import Table from "../../../components/ui/table";
import Button from "../../../components/ui/button";
const Doctors = () => {
  return (
    <div>
      <div style={{ width: "250px", margin: "15px 0px" }}>
        <Button content={"Thêm bác sĩ mới"} />
      </div>

      <Table />
    </div>
  );
};

export default Doctors;
