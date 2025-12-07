import React, { useEffect, useState, useMemo } from "react";
import {
  Container, Grid, Box, Typography, TextField, MenuItem,
  InputAdornment, Skeleton, Paper
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BreadCrumb from "../../../components/ui/bread-crumb";
import { doctorApi, specApi } from "../../../services/api";
import DoctorCard from "./DoctorCard";
import BookingDialog from "./BookingDialog";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("all");
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [docsRes, specsRes] = await Promise.all([
          doctorApi.getAll(),
          specApi.getAll()
        ]);

        const allDocs = docsRes.data || docsRes;
        setDoctors(allDocs.filter(d => d.isActive));
        setSpecializations(specsRes.data || specsRes);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenBooking(true);
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const nameMatch = doc.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
      const docSpecCode = doc.specialization?.code || doc.specCode || "";
      const specMatch = selectedSpec === "all" || docSpecCode === selectedSpec;
      return nameMatch && specMatch;
    });
  }, [doctors, searchTerm, selectedSpec]);

  return (
    <Box sx={{
      bgcolor: "#f4f6f8",
      minHeight: "100vh",
      pb: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Box sx={{
        bgcolor: "white",
        py: 6,
        mb: 4,
        borderBottom: "1px solid #eaeaea",
        width: "100%"
      }}>
        <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ width: "100%", maxWidth: 1200 }}>
            <BreadCrumb
              items={[
                { label: "Trang chủ", to: "/" },
                { label: "Đặt lịch khám", to: "/bac-si" }
              ]}
            />
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{
                mt: 3,
                mb: 2,
                color: '#1a202c',
                textAlign: "center"
              }}
            >
              Đội ngũ Bác sĩ chuyên khoa
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                textAlign: "center",
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6
              }}
            >
              Kết nối với các chuyên gia y tế hàng đầu, sẵn sàng tư vấn sức khỏe cho bạn mọi lúc, mọi nơi.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ width: "100%" }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          mb: 6
        }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              width: "100%",
              maxWidth: 1200
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Tìm kiếm bác sĩ theo tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      height: 56
                    }
                  }}
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.1rem"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} >
                <TextField
                  select
                  fullWidth
                  label="Chuyên khoa"
                  value={selectedSpec}
                  onChange={(e) => setSelectedSpec(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.1rem"
                    }
                  }}
                >
                  <MenuItem value="all">Tất cả chuyên khoa</MenuItem>
                  {specializations.map((spec) => (
                    <MenuItem key={spec.code} value={spec.code}>
                      {spec.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Grid
            container
            spacing={2}
            sx={{
              maxWidth: 1400,
              justifyContent: loading || filteredDoctors.length === 0 ? "center" : "center"
            }}
          >
            {loading ? (
              Array.from(new Array(8)).map((_, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box sx={{
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 4,
                    height: 380,
                    width: "100%",
                    maxWidth: 300
                  }}>
                    <Skeleton variant="circular" width={100} height={100} sx={{ mx: "auto", mb: 3 }} />
                    <Skeleton variant="text" height={35} sx={{ mb: 1.5 }} />
                    <Skeleton variant="text" width="70%" sx={{ mx: "auto", mb: 2.5 }} />
                    <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
                  </Box>

                </Grid>
              ))
            ) : filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={doctor.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <DoctorCard doctor={doctor} onBook={handleOpenBooking} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{
                  textAlign: "center",
                  py: 10,
                  width: "100%"
                }}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png"
                    alt="No result"
                    style={{
                      width: 180,
                      marginBottom: 25,
                      opacity: 0.7
                    }}
                  />
                  <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
                    Không tìm thấy bác sĩ phù hợp.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Vui lòng thử lại với từ khóa hoặc chuyên khoa khác.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
          <BookingDialog
            open={openBooking}
            doctor={selectedDoctor}
            onClose={() => setOpenBooking(false)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DoctorPage;