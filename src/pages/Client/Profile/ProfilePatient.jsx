import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import { TextField, Avatar, Button, Typography, Box } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { AuthContext } from "../../../providers/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatarUrl || "/avatars/default.jpg"
  );

  if (!user) return null;

  // Xử lý chọn file avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      // TODO: bạn có thể upload file lên server khi save
    }
  };

  return (
    <Box className={styles.container}>
      {/* Avatar + upload */}
      <Box className={styles.avatarSection}>
        <Avatar
          src={avatarPreview}
          alt={user.fullName}
          className={styles.avatar}
        />
        <label htmlFor="avatarUpload" className={styles.uploadLabel}>
          <CloudUploadOutlinedIcon style={{ marginRight: 6, fontSize: 20 }} />
          Change Avatar
        </label>
        <input
          type="file"
          id="avatarUpload"
          accept="image/*"
          className={styles.uploadInput}
          onChange={handleAvatarChange}
        />
        <Typography variant="h6">{user.fullName}</Typography>
        <Typography variant="body2">{user.email}</Typography>
        <Typography variant="body2" color="textSecondary">
          {user.userType}
        </Typography>
      </Box>

      {/* Form edit thông tin */}
      <Box className={styles.formSection}>
        <div style={{ display: "flex", gap: "15px" }}>
          <TextField
            fullWidth
            margin="normal"
            label="User Type"
            defaultValue={user.userType}
            variant="outlined"
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="User ID"
            defaultValue={user.id}
            variant="outlined"
            disabled
          />
        </div>

        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          defaultValue={user.fullName}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          defaultValue={user.email}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          defaultValue={user.username}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />

        <Button
          variant="contained"
          color="primary"
          className={styles.submitButton}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
