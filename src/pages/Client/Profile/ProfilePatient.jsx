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
import { formatDate } from "../../../utils/formatDate";

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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
=======
import styles from "./style.module.scss";
import {
  TextField,
  Avatar,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Paper
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../../../providers/AuthProvider";
import { patientApi } from "../../../services/api";
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatarUrl || "/avatars/default.jpg"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || "",
    phone: user?.phone || "",
    bio: user?.bio || ""
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {

    try {
      const res = await patientApi.getbyId(user.id);
      setUserData(res);
      console.log(res);
      setFormData({
        fullName: res.fullName,
        email: res.email,
        username: res.username,
        phone: res.phone,
        bio: res.bio,
      });

      setAvatarPreview(res.avatarUrl ?? "/avatars/default.jpg");
    } catch (e) {
      console.error("Error fetching user", e);
    }
  };
  if (!user) return null;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const updatedUser = {
        ...user,
        fullName: formData.fullName,
        avatarUrl: newAvatarUrl,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      showSnackbar("Cập nhật hồ sơ thành công!", "success");
      setProfileData((prev) => ({ ...prev, ...payload }));
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
              <Skeleton
                variant="circular"
                width={160}
                height={160}
                sx={{ mx: "auto" }}
              />
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
        <Box flex={{ xs: "0 0 100%", md: "0 0 340px" }} width="100%">
          <Paper
            elevation={6}
            sx={{ p: 4, textAlign: "center", borderRadius: 4, height: "100%" }}
          >
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
              <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                hidden
                onChange={handleAvatarChange}
              />
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
                    "&:hover": {
                      bgcolor: "primary.dark",
                      transform: "scale(1.1)",
                    },
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
              label={
                user.userType === "patient"
                  ? "BỆNH NHÂN"
                  : user.userType?.toUpperCase()
              }
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
              <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                gap={3}
              >
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
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
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
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone />
                          </InputAdornment>
                        ),
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
                        startAdornment: (
                          <InputAdornment position="start">
                            <Cake />
                          </InputAdornment>
                        ),
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
                        startAdornment: (
                          <InputAdornment position="start">
                            <Transgender />
                          </InputAdornment>
                        ),
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
                    <Typography
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      Hồ sơ y tế
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tính năng chỉnh sửa bệnh sử, dị ứng, tiền sử bệnh đang
                      được phát triển...
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
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>

      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      username: user.username || "",
      phone: user.phone || "",
      bio: user.bio || ""
    });
    setIsEditing(false);
  };

  return (
    <Box className={styles.container}>
      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      )}

      <Grid container spacing={3} wrap="nowrap">
        <Grid item sx={{ minWidth: "auto" }}>
          <Card className={styles.profileCard} elevation={0}>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={avatarPreview}
                  alt={user.fullName}
                  sx={{
                    width: 150,
                    height: 150,
                    border: "4px solid white",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    mb: 2
                  }}
                />
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: -8,
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": { backgroundColor: "primary.dark" },
                    width: 40,
                    height: 40
                  }}
                >
                  <EditOutlinedIcon fontSize="small" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Box>

              <Typography variant="h5" fontWeight={600} gutterBottom>
                {user.fullName}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1
                }}
              >
                <EmailOutlinedIcon fontSize="small" />
                {user.email}
              </Typography>

              <Box sx={{
                display: "inline-block",
                backgroundColor: "primary.lighter",
                color: "primary.main",
                px: 2,
                py: 0.5,
                borderRadius: 20,
                fontWeight: 500,
                fontSize: "0.875rem",
                mb: 3
              }}>
                {user.userType}
              </Box>

              <Divider sx={{ my: 3 }} />
            </CardContent>
          </Card>

          {/* Account Info Card */}
          <Card className={styles.infoCard} elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Account Information
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  User ID
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {user.id}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Member Since
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Last Login
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {new Date(user.lastLogin).toLocaleString()}
                </Typography>
              </Box>
              
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Form */}
        <Grid item sx={{ minWidth: "auto" }}>
          <Card className={styles.formCard} elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
              }}>
                <Typography variant="h5" fontWeight={600}>
                  Edit Profile
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<CancelOutlinedIcon />}
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={isLoading ? <CircularProgress size={20} /> : <SaveOutlinedIcon />}
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<EditOutlinedIcon />}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <PersonOutlineOutlinedIcon
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                      ),
                    }}
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <BadgeOutlinedIcon
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                      ),
                    }}
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <EmailOutlinedIcon
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                      ),
                    }}
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    placeholder="+84 123 456 789"
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    multiline
                    rows={4}
                    placeholder="Tell us about yourself..."
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>

              {/* Password Change Section */}
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Password Settings
                </Typography>
              </Divider>

              <Button
                variant="outlined"
                startIcon={<LockOutlinedIcon />}
                sx={{ mt: 1 }}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;