import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextFields from "@/components/ui/TextFields";
import Button from "@/components/ui/Button";
import styles from "./style.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Profile = () => {
  const [editing, setEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "Nguyễn Văn A",
      email: "admin@company.com",
      phone: "+84 123 456 789",
      address: "Hà Nội, Việt Nam",
      bio: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Vui lòng nhập họ tên"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      phone: Yup.string().required("Vui lòng nhập số điện thoại"),
      address: Yup.string().required("Vui lòng nhập địa chỉ"),
    }),
    onSubmit: () => {
      setEditing(false);
    },
  });

  return (
    <div className={styles.adminProfileWrapper}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h1 className={styles.profileTitle}>Hồ Sơ Admin</h1>
          <p className={styles.profileSubtitle}>
            Quản lý thông tin cá nhân và cài đặt tài khoản
          </p>
        </div>

        <div className={styles.profileContent}>
          <div className={`${styles.profileCard} ${styles.profileSidebar}`}>
            <div className={styles.profileAvatar}>NV</div>

            <h2 className={styles.profileName}>{formik.values.fullName}</h2>
            <p className={styles.profileEmail}>{formik.values.email}</p>
            <span className={styles.profileRole}>Super Admin</span>

            <div className={styles.profileStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Dự án</span>
                <span className={styles.statValue}>24</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Nhiệm vụ</span>
                <span className={styles.statValue}>156</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Giờ làm việc</span>
                <span className={styles.statValue}>1,240</span>
              </div>
            </div>

            <Button
              content={editing ? "Hủy chỉnh sửa" : "Chỉnh sửa hồ sơ"}
              onClick={() => setEditing(!editing)}
              variant="outlined"
            />
          </div>

          <div className={styles.profileMain}>
            <div className={styles.infoSection}>
              <h3 className={styles.sectionTitle}>
                <AccountCircleIcon /> Thông Tin Cá Nhân
              </h3>

              {!editing ? (
                <>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Họ và Tên</span>
                      <span className={styles.infoValue}>
                        {formik.values.fullName}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Email</span>
                      <span className={styles.infoValue}>
                        {formik.values.email}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Số Điện Thoại</span>
                      <span className={styles.infoValue}>
                        {formik.values.phone}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Địa Chỉ</span>
                      <span className={styles.infoValue}>
                        {formik.values.address}
                      </span>
                    </div>
                  </div>

                  <div className={styles.bioWrapper}>
                    <span className={styles.infoLabel}>Giới Thiệu</span>
                    <p className={styles.infoValue}>
                      {formik.values.bio || "---"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <div className={styles.infoGrid}>
                      <TextFields
                        label="Họ và Tên"
                        name="fullName"
                        formik={formik}
                      />

                      <TextFields label="Email" name="email" formik={formik} />

                      <TextFields
                        label="Số Điện Thoại"
                        name="phone"
                        formik={formik}
                      />

                      <TextFields
                        label="Địa Chỉ"
                        name="address"
                        formik={formik}
                      />
                    </div>

                    <div className={styles.actions}>
                      <Button content="Lưu thay đổi" type="submit" />

                      <Button
                        content="Hủy"
                        variant="outlined"
                        onClick={() => setEditing(false)}
                      />
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
