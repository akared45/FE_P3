import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, Box, Divider, Grid, Chip, Alert
} from "@mui/material";
import { appointmentApi } from "@services/api";
import { AccessTime, CalendarMonth, EventNote } from "@mui/icons-material";

const DAYS_CONFIG = {
  "Sunday": { label: "Chủ Nhật", index: 0 },
  "Monday": { label: "Thứ 2", index: 1 },
  "Tuesday": { label: "Thứ 3", index: 2 },
  "Wednesday": { label: "Thứ 4", index: 3 },
  "Thursday": { label: "Thứ 5", index: 4 },
  "Friday": { label: "Thứ 6", index: 5 },
  "Saturday": { label: "Thứ 7", index: 6 },
};

const BookingDialog = ({ open, onClose, doctor }) => {
    console.log(doctor);
  const [loading, setLoading] = useState(false);
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState(null); 
  const [calculatedDate, setCalculatedDate] = useState("");
  const [generatedSlots, setGeneratedSlots] = useState([]); 
  const [selectedTime, setSelectedTime] = useState(null); 
  const [symptoms, setSymptoms] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedScheduleIndex(null);
      setCalculatedDate("");
      setGeneratedSlots([]);
      setSelectedTime(null);
      setSymptoms("");
    }
  }, [open, doctor]);

  const getNextDate = (dayName) => {
    const targetIndex = DAYS_CONFIG[dayName]?.index;
    if (targetIndex === undefined) return null;

    const date = new Date();
    const currentDayIndex = date.getDay();

    let daysToAdd = targetIndex - currentDayIndex;
    if (daysToAdd <= 0) {
    
        daysToAdd += 7; 
    }
    
    date.setDate(date.getDate() + daysToAdd);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSelectSchedule = (index, schedule) => {
    setSelectedScheduleIndex(index);
    setSelectedTime(null); 
    const nextDate = getNextDate(schedule.day);
    setCalculatedDate(nextDate);

    const slots = [];
    const [startH, startM] = schedule.start.split(":").map(Number);
    const [endH, endM] = schedule.end.split(":").map(Number);
    
    let currentH = startH;
    let currentM = startM;

    while (currentH < endH || (currentH === endH && currentM < endM)) {
      const timeString = `${currentH.toString().padStart(2, '0')}:${currentM.toString().padStart(2, '0')}`;
      slots.push(timeString);
      currentM += 30;
      if (currentM >= 60) { currentH += 1; currentM -= 60; }
    }
    setGeneratedSlots(slots);
  };

  const handleBook = async () => {
    if (!selectedTime || !symptoms) return alert("Vui lòng nhập đủ thông tin!");
    setLoading(true);
    try {
      const dateTimeString = `${calculatedDate}T${selectedTime}:00`; 
      const appointmentDate = new Date(dateTimeString).toISOString(); 

      await appointmentApi.book({
        doctorId: doctor.id,
        appointmentDate, 
        symptoms
      });
      alert("Đặt lịch thành công!");
      onClose();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data?.message || "Thất bại"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
        <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonth color="primary"/> 
            Đặt lịch khám
        </Box>
        <Typography variant="body2" color="text.secondary">
            Bác sĩ: <strong>{doctor?.fullName}</strong>
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        
        {/* === 1. DANH SÁCH CA LÀM VIỆC (BUTTONS) === */}
        <Box mb={3} mt={1}>
            <Typography variant="subtitle2" gutterBottom fontWeight={600} sx={{ display:'flex', gap:1 }}>
                <EventNote fontSize="small" color="action"/> 1. Chọn buổi khám (Lịch tuần)
            </Typography>

            <Grid container spacing={1.5}>
                {doctor?.schedules?.map((schedule, index) => {
                    const isSelected = selectedScheduleIndex === index;
                    const label = DAYS_CONFIG[schedule.day]?.label || schedule.day;
                    
                    return (
                        <Grid item xs={6} sm={4} key={index}>
                            <Button
                                variant={isSelected ? "contained" : "outlined"}
                                fullWidth
                                onClick={() => handleSelectSchedule(index, schedule)}
                                sx={{
                                    borderRadius: 2,
                                    height: '100%',
                                    flexDirection: 'column',
                                    py: 1.5,
                                    textTransform: 'none',
                                    // Logic "Màu xám": Nếu đã chọn cái khác thì cái này mờ đi
                                    opacity: (selectedScheduleIndex !== null && !isSelected) ? 0.5 : 1,
                                    borderColor: isSelected ? '' : '#e0e0e0',
                                    backgroundColor: isSelected ? '' : '#fff',
                                    color: isSelected ? '#fff' : '#333',
                                    boxShadow: isSelected ? 3 : 0,
                                    '&:hover': {
                                        borderColor: '#2196f3',
                                        backgroundColor: isSelected ? '' : '#f0f7ff',
                                        opacity: 1
                                    }
                                }}
                            >
                                <Typography variant="body2" fontWeight={700}>{label}</Typography>
                                <Typography variant="caption">{schedule.start} - {schedule.end}</Typography>
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
            
            {(!doctor?.schedules || doctor.schedules.length === 0) && (
                <Alert severity="warning" sx={{ mt: 1 }}>Bác sĩ chưa cập nhật lịch làm việc.</Alert>
            )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* === 2. CHỌN KHUNG GIỜ CỤ THỂ === */}
        {selectedScheduleIndex !== null && (
            <Box mb={3} className="fade-in">
                <Typography variant="subtitle2" gutterBottom fontWeight={600} sx={{ display:'flex', gap:1 }}>
                    <AccessTime fontSize="small" color="action"/> 
                    2. Chọn giờ khám (Ngày: {calculatedDate.split('-').reverse().join('/')})
                </Typography>

                <Grid container spacing={1.5}>
                    {generatedSlots.map((time) => (
                        <Grid item xs={3} key={time}>
                            <Button
                                variant={selectedTime === time ? "contained" : "outlined"}
                                color="success" // Màu xanh lá cho giờ
                                fullWidth
                                onClick={() => setSelectedTime(time)}
                                sx={{ 
                                    borderRadius: 2, 
                                    color: selectedTime === time ? '#fff' : '#2e7d32',
                                    borderColor: selectedTime === time ? '' : '#a5d6a7'
                                }}
                            >
                                {time}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )}

        {/* === 3. NHẬP TRIỆU CHỨNG === */}
        {selectedTime && (
            <Box className="fade-in">
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>3. Mô tả triệu chứng *</Typography>
                <TextField
                    multiline rows={2} fullWidth
                    placeholder="Ví dụ: Đau đầu, sốt cao..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                />
            </Box>
        )}

      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: '1px solid #eee' }}>
        <Button onClick={onClose} color="inherit">Hủy</Button>
        <Button 
            onClick={handleBook} 
            variant="contained" 
            disabled={loading || !selectedTime || !symptoms}
        >
          {loading ? "Đang xử lý..." : "Xác nhận đặt lịch"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog;