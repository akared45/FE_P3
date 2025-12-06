import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Box,
  Divider,
  IconButton,
  Paper
} from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import { doctorApi, specApi } from "@services/api";

const DAYS_OF_WEEK = [
  { value: "Monday", label: "Thứ 2" },
  { value: "Tuesday", label: "Thứ 3" },
  { value: "Wednesday", label: "Thứ 4" },
  { value: "Thursday", label: "Thứ 5" },
  { value: "Friday", label: "Thứ 6" },
  { value: "Saturday", label: "Thứ 7" },
  { value: "Sunday", label: "Chủ nhật" },
];

const CreateDoctorDialog = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState([]);

  const [formData, setFormData] = useState({
    username: "", email: "", password: "", fullName: "",
    licenseNumber: "", specCode: "",
    qualifications: [], 
    workHistory: [],   
    schedules: []      
  });

  useEffect(() => {
    if (open) {
      const fetchSpecs = async () => {
        try {
          const res = await specApi.getAll();
          const specs = res.data || res;
          setSpecializations(specs);
          if (specs.length > 0) setFormData(prev => ({ ...prev, specCode: specs[0].code }));
        } catch (error) {
          console.error("Failed to fetch specs", error);
        }
      };
      fetchSpecs();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, { degree: "", institution: "", year: new Date().getFullYear() }]
    }));
  };
  const removeQualification = (index) => {
    const newList = [...formData.qualifications];
    newList.splice(index, 1);
    setFormData(prev => ({ ...prev, qualifications: newList }));
  };
  const changeQualification = (index, field, value) => {
    const newList = [...formData.qualifications];
    newList[index][field] = value;
    setFormData(prev => ({ ...prev, qualifications: newList }));
  };

  const addWorkHistory = () => {
    setFormData(prev => ({
      ...prev,
      workHistory: [...prev.workHistory, { position: "", place: "", from: "", to: "" }]
    }));
  };
  const removeWorkHistory = (index) => {
    const newList = [...formData.workHistory];
    newList.splice(index, 1);
    setFormData(prev => ({ ...prev, workHistory: newList }));
  };
  const changeWorkHistory = (index, field, value) => {
    const newList = [...formData.workHistory];
    newList[index][field] = value;
    setFormData(prev => ({ ...prev, workHistory: newList }));
  };

  const addSchedule = () => {
    setFormData(prev => ({
      ...prev,
      schedules: [...prev.schedules, { day: "Monday", start: "08:00", end: "12:00", maxPatients: 10 }]
    }));
  };
  const removeSchedule = (index) => {
    const newList = [...formData.schedules];
    newList.splice(index, 1);
    setFormData(prev => ({ ...prev, schedules: newList }));
  };
  const changeSchedule = (index, field, value) => {
    const newList = [...formData.schedules];
    newList[index][field] = value;
    setFormData(prev => ({ ...prev, schedules: newList }));
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email) {
      alert("Thiếu thông tin cơ bản!");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...formData,
        workHistory: formData.workHistory.map(w => ({
            ...w,
            to: w.to ? w.to : null
        }))
      };
      await doctorApi.create(payload);
      alert("Thêm bác sĩ thành công!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Lỗi: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Thêm Hồ Sơ Bác Sĩ</DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ mt: 1 }}>
          
          <Typography variant="h6" color="primary" gutterBottom>1. Thông tin Tài khoản & Chuyên môn</Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField fullWidth label="Username *" name="username" value={formData.username} onChange={handleChange} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label="Email *" name="email" value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label="Mật khẩu *" name="password" type="password" value={formData.password} onChange={handleChange} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label="Họ tên *" name="fullName" value={formData.fullName} onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
               <TextField select fullWidth label="Chuyên khoa" name="specCode" value={formData.specCode} onChange={handleChange}>
                  {specializations.map(s => <MenuItem key={s.code} value={s.code}>{s.name}</MenuItem>)}
               </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Số chứng chỉ" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" color="primary">2. Bằng cấp / Học vấn</Typography>
            <Button startIcon={<AddCircleOutline />} onClick={addQualification} variant="outlined" size="small">Thêm bằng cấp</Button>
          </Box>
          
          {formData.qualifications.map((item, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#f9fafb' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <TextField fullWidth label="Tên bằng cấp (VD: Tiến sĩ Y học)" size="small" 
                    value={item.degree} onChange={(e) => changeQualification(index, 'degree', e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="Nơi cấp (Trường/Viện)" size="small" 
                    value={item.institution} onChange={(e) => changeQualification(index, 'institution', e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                  <TextField fullWidth label="Năm" type="number" size="small" 
                    value={item.year} onChange={(e) => changeQualification(index, 'year', e.target.value)} />
                </Grid>
                <Grid item xs={1}>
                  <IconButton color="error" onClick={() => removeQualification(index)}><DeleteOutline /></IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" color="primary">3. Quá trình Công tác</Typography>
            <Button startIcon={<AddCircleOutline />} onClick={addWorkHistory} variant="outlined" size="small">Thêm công tác</Button>
          </Box>

          {formData.workHistory.map((item, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#f9fafb' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <TextField fullWidth label="Chức vụ (VD: Trưởng khoa)" size="small" 
                    value={item.position} onChange={(e) => changeWorkHistory(index, 'position', e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="Nơi làm việc (Bệnh viện)" size="small" 
                    value={item.place} onChange={(e) => changeWorkHistory(index, 'place', e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                  <TextField fullWidth label="Từ ngày" type="date" size="small" InputLabelProps={{ shrink: true }}
                    value={item.from ? item.from.split('T')[0] : ''} onChange={(e) => changeWorkHistory(index, 'from', e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                  <TextField fullWidth label="Đến ngày (Để trống nếu là hiện tại)" type="date" size="small" InputLabelProps={{ shrink: true }}
                    value={item.to ? item.to.split('T')[0] : ''} onChange={(e) => changeWorkHistory(index, 'to', e.target.value)} />
                </Grid>
                <Grid item xs={1}>
                  <IconButton color="error" onClick={() => removeWorkHistory(index)}><DeleteOutline /></IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" color="primary">4. Lịch làm việc định kỳ</Typography>
            <Button startIcon={<AddCircleOutline />} onClick={addSchedule} variant="outlined" size="small">Thêm lịch</Button>
          </Box>

          {formData.schedules.map((item, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#f9fafb' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <TextField select fullWidth label="Thứ" size="small"
                    value={item.day} onChange={(e) => changeSchedule(index, 'day', e.target.value)}>
                    {DAYS_OF_WEEK.map(day => <MenuItem key={day.value} value={day.value}>{day.label}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Bắt đầu" type="time" size="small" InputLabelProps={{ shrink: true }}
                    value={item.start} onChange={(e) => changeSchedule(index, 'start', e.target.value)} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Kết thúc" type="time" size="small" InputLabelProps={{ shrink: true }}
                    value={item.end} onChange={(e) => changeSchedule(index, 'end', e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                  <TextField fullWidth label="Max BN" type="number" size="small"
                    value={item.maxPatients} onChange={(e) => changeSchedule(index, 'maxPatients', e.target.value)} />
                </Grid>
                <Grid item xs={1}>
                  <IconButton color="error" onClick={() => removeSchedule(index)}><DeleteOutline /></IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}

        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Hủy bỏ</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Đang lưu..." : "Tạo Bác sĩ"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDoctorDialog;