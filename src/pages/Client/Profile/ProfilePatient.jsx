import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { uploadApi, patientApi } from "../../../services/api";
import TextFields from "@components/ui/TextFields";
import Button from "@components/ui/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Lấy thông tin user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user.id;
        const { data } = await patientApi.getUserById(id);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Đang tải...</p>;

  // Validation schema với Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Họ và tên là bắt buộc"),
    phone: Yup.string().required("Số điện thoại là bắt buộc"),
    address: Yup.string().required("Địa chỉ là bắt buộc"),
  });

  // Upload avatar
  const handleAvatarChange = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);

    try {
      const { data } = await uploadApi.uploadImage(file);
      setFieldValue("avatarUrl", data.url); // giả sử API trả về data.url
    } catch (error) {
      console.error("Upload avatar failed", error);
    }
  };

  return (
    <div className={styles.profile}>
      <h2>Hồ sơ cá nhân</h2>

      <Formik
        enableReinitialize
        initialValues={profile}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const update = {
              fullName: values.fullName,
              phone: values.phone,
              address: values.address,
              avatarUrl: values.avatarUrl,
            };
            await patientApi.updateMe(update);
            setProfile(values);
            setEditing(false);
            setAvatarPreview(null);
          } catch (error) {
            console.error("Error updating profile", error);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className={styles.profileInfo}>
            {/* Avatar */}
            <div className={styles.avatarSection}>
              <img
                src={avatarPreview || values.avatarUrl || "/default-avatar.png"}
                alt="avatar"
                className={styles.avatar}
              />
              {editing && (
                <label className={styles.uploadButton}>
                  Chọn ảnh mới
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAvatarChange(e, setFieldValue)}
                  />
                </label>
              )}
            </div>

            {/* Form fields */}
            <div className={styles.infoSection}>
              <TextFields
                label="Họ và tên"
                name="fullName"
                formik={{ values, errors, touched, handleChange, handleBlur }}
                disabled={!editing}
              />

              <TextFields
                label="Email"
                name="email"
                value={values.email}
                disabled
              />

              <TextFields
                label="Số điện thoại"
                name="phone"
                formik={{ values, errors, touched, handleChange, handleBlur }}
                disabled={!editing}
              />

              <TextFields
                label="Địa chỉ"
                name="address"
                formik={{ values, errors, touched, handleChange, handleBlur }}
                disabled={!editing}
              />
            </div>

            {/* Buttons */}
            <div className={styles.actions}>
              {editing ? (
                <>
                  <Button content="Lưu lại" type="submit" />
                  <Button
                    content="Hủy"
                    mode="secondary"
                    onClick={() => {
                      setEditing(false);
                      setAvatarPreview(null);
                    }}
                  />
                </>
              ) : (
                <Button content="Chỉnh sửa" onClick={() => setEditing(true)} />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
