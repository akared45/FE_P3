import React, { useContext, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import {
  PhotoCamera,
  Save,
  Phone,
  Cake,
  Transgender,
  Email,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "../../../providers/AuthProvider";
import { patientApi, uploadApi } from "@services/api";
import { getImageUrl } from "@utils/imageHelper";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0];
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await patientApi.getById("me");
      console.log(res);
      const data = res.data || res;
      
      setProfileData(data);
      setFormData({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        dob: formatDate(data.dateOfBirth || data.dob),
        gender: data.gender || "",
      });

      if (data.avatarUrl) setPreviewUrl(getImageUrl(data.avatarUrl));
    } catch (err) {
      showSnackbar("Không tải được hồ sơ", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      let newAvatarUrl = profileData.avatarUrl;
      if (avatarFile) {
        const uploadRes = await uploadApi.uploadImage(avatarFile);
        newAvatarUrl = uploadRes.data?.url || uploadRes.url || newAvatarUrl;
      }
      const payload = { ...formData, avatarUrl: newAvatarUrl };
      if (user.userType === "patient") {
        await patientApi.updateMe(payload);
      } else {
        showSnackbar("Chức năng chưa hỗ trợ cho vai trò này", "info");
        return;
      }
      const updatedUser = { ...user, fullName: formData.fullName, avatarUrl: newAvatarUrl };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      showSnackbar("Cập nhật hồ sơ thành công!", "success");
      setProfileData(prev => ({ ...prev, ...payload }));
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Cập nhật thất bại", "error");
    } finally {
      setSaving(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          <Box flex={{ xs: "0 0 100%", md: "0 0 340px" }}>
            <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
              <Skeleton variant="circular" width={160} height={160} sx={{ mx: "auto" }} />
              <Skeleton height={40} width="80%" sx={{ mx: "auto", mt: 3 }} />
              <Skeleton height={30} width="60%" sx={{ mx: "auto", mt: 1 }} />
            </Paper>
          </Box>
          <Box flex={1}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Skeleton height={60} width="40%" />
              <Skeleton height={80} sx={{ mt: 3 }} count={4} />
            </Paper>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" fontWeight="bold" mb={5} color="primary.main">
        Hồ sơ cá nhân
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={{ xs: 3, md: 5 }}
        alignItems="flex-start"
      >
        <Box
          flex={{ xs: "0 0 100%", md: "0 0 340px" }}
          width="100%"
        >
          <Paper elevation={6} sx={{ p: 4, textAlign: "center", borderRadius: 4, height: "100%" }}>
            <Box position="relative" display="inline-flex">
              <Avatar
                src={previewUrl || "/default-avatar.png"}
                alt={formData.fullName}
                sx={{
                  width: 180,
                  height: 180,
                  border: "8px solid",
                  borderColor: "background.default",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
              />
              <input accept="image/*" id="avatar-upload" type="file" hidden onChange={handleAvatarChange} />
              <label htmlFor="avatar-upload">
                <IconButton
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    bgcolor: "primary.main",
                    color: "white",
                    width: 48,
                    height: 48,
                    boxShadow: 4,
                    "&:hover": { bgcolor: "primary.dark", transform: "scale(1.1)" },
                    transition: "all 0.2s",
                  }}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>

            <Typography variant="h5" fontWeight="bold" mt={3}>
              {formData.fullName || "Chưa đặt tên"}
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              {formData.email}
            </Typography>
            <Chip
              label={user.userType === "patient" ? "BỆNH NHÂN" : user.userType?.toUpperCase()}
              color="primary"
              variant="outlined"
              sx={{ mt: 2, fontWeight: "bold", fontSize: "0.9rem", px: 2 }}
            />
          </Paper>
        </Box>

        <Box flex={1} width="100%">
          <Paper elevation={6} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={4}>
              Chỉnh sửa thông tin
            </Typography>

            <Stack spacing={3.5}>
              <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={3}>
                <TextField
                  label="Họ và tên"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
                  }}
                />

                {user.userType === "patient" && (
                  <>
                    <TextField
                      label="Số điện thoại"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Phone /></InputAdornment>,
                      }}
                    />
                    <TextField
                      label="Ngày sinh"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Cake /></InputAdornment>,
                      }}
                    />
                    <TextField
                      select
                      SelectProps={{ native: true }}
                      label="Giới tính"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Transgender /></InputAdornment>,
                      }}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </TextField>
                  </>
                )}
              </Box>

              {user.userType === "patient" && (
                <>
                  <Divider />
                  <Box>
                    <Typography fontWeight="bold" color="text.primary" gutterBottom>
                      Hồ sơ y tế
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tính năng chỉnh sửa bệnh sử, dị ứng, tiền sử bệnh đang được phát triển...
                    </Typography>
                  </Box>
                </>
              )}

              <Box textAlign="right" mt={2}>
                <LoadingButton
                  variant="contained"
                  size="large"
                  startIcon={<Save />}
                  loading={saving}
                  loadingPosition="start"
                  onClick={handleSubmit}
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  Lưu thay đổi
                </LoadingButton>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;