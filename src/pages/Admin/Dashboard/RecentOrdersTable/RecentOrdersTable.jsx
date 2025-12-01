import React from "react";
import Table from "@components/Table/Table";
import styles from "./style.module.scss";

const RecentOrdersTable = () => {
  const data = [
    {
      id: "F12345",
      customer: "Alice Johnson",
      product: "Premium Plan",
      amount: "$219",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "F12346",
      customer: "Bob Smith",
      product: "Basic Plan",
      amount: "$99",
      status: "Pending",
      date: "2024-01-14",
    },
    {
      id: "F12347",
      customer: "Carol White",
      product: "Pro Plan",
      amount: "$119",
      status: "Completed",
      date: "2024-01-14",
    },
    {
      id: "F12348",
      customer: "David Brown",
      product: "Enterprise Plan",
      amount: "$499",
      status: "Cancelled",
      date: "2024-01-13",
    },
  ];

  const columns = [
    { key: "id", title: "ORDER ID" },
    { key: "customer", title: "CUSTOMER" },
    { key: "product", title: "PRODUCT" },
    { key: "amount", title: "AMOUNT" },
    {
      key: "status",
      title: "STATUS",
      render: (value) => {
        if (value === "Completed")
          return <span className={styles.completed}>Completed</span>;
        if (value === "Pending")
          return <span className={styles.pending}>Pending</span>;
        if (value === "Cancelled")
          return <span className={styles.cancelled}>Cancelled</span>;
      },
    },
    { key: "date", title: "DATE" },
  ];

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.header}>
        <h3>Lượt khám gần đây</h3>
        <button className={styles.addBtn}>Add New</button>
      </div>

      <Table columns={columns} data={data} />
    </div>
  );
};

export default RecentOrdersTable;
