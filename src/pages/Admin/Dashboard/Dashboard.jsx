import React from "react";
import StatsCard from "@components/StatsCard/StatsCard";
import { FaUsers } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsBox2Fill } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import styles from "./style.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard__container}>
      <div className={styles.dashboard__analys}>
        <StatsCard
          title={"Tổng số bệnh nhân"}
          icon={<FaUsers />}
          value={567}
          percent={"12"}
        />
        <StatsCard
          title={"Doanh thu"}
          icon={<FaMoneyBillTrendUp />}
          value={"$89.432"}
          percent={"12"}
        />
        <StatsCard
          title={"Lượt khám"}
          icon={<BsBox2Fill />}
          value={"89"}
          percent={"1234"}
        />
        <StatsCard
          title={"Thống kê"}
          icon={<FaChartLine />}
          value={"40%"}
          percent={"12.3"}
        />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Dashboard;
