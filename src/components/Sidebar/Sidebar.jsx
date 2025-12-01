import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

import { AiFillDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { BsCalendarDateFill } from "react-icons/bs";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

const Sidebar = () => {
  return (
    <section className={styles.sidebar} id="sidebar">
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>Health online</div>
        </div>
      </div>

      <nav className={styles.navMenu}>
        <Link
          to="bang-dieu-khien"
          className={`${styles.navItem} ${styles.active}`}
        >
          <span className={styles.navIcon}>
            <AiFillDashboard />
          </span>
          <span>Dashboard</span>
        </Link>
        <Link to="chat" className={styles.navItem}>
          <span className={styles.navIcon}>
            <BiSolidMessageRoundedDetail />
          </span>
          <span>Message</span>
        </Link>

        <Link to="benh-nhan" className={styles.navItem}>
          <span className={styles.navIcon}>
            <FaUser />
          </span>
          <span>Patients</span>
        </Link>

        <Link to="bac-si" className={styles.navItem}>
          <span className={styles.navIcon}>
            <FaUserDoctor />
          </span>
          <span>Doctors</span>
        </Link>

        <Link to="lich-lam-viec" className={styles.navItem}>
          <span className={styles.navIcon}>
            <BsCalendarDateFill />
          </span>
          <span>Schedule</span>
        </Link>

        <Link to="bao-cao" className={styles.navItem}>
          <span className={styles.navIcon}>
            <BiSolidReport />
          </span>
          <span>Reports</span>
        </Link>

        <Link to="cai-dat" className={styles.navItem}>
          <span className={styles.navIcon}>
            <IoMdSettings />
          </span>
          <span>Settings</span>
        </Link>
      </nav>
    </section>
  );
};

export default Sidebar;
