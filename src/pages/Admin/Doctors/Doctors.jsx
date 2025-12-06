import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Rating,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@components/ui/button";
import { doctorApi } from "@services/api";
import EditDoctorDialog from "./EditDoctorDialog";
import CreateDoctorDialog from "./CreateDoctorDialog";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await doctorApi.getAll();
      const data = res.map((item) => ({
        id: item.id,
        avatar: item.avatarUrl || "",
        fullName: item.fullName || "Chưa cập nhật",
        email: item.email,
        specialization: item.specialization?.name || "Chưa cập nhật",
        licenseNumber: item.licenseNumber || "—",
        yearsExperience: item.yearsExperience || 0,
        rating: item.rating || 0,
        isActive: item.isActive ?? true,
      }));
      setDoctors(data);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleOpenEdit = (doctor) => {
    console.log(doctor)
    const id = doctor.id;
    setSelected(id);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelected(null);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bác sĩ này không? Hành động này sẽ vô hiệu hóa tài khoản.")) {
      try {
        await doctorApi.delete(id);
        alert("Xóa thành công!");
        fetchDoctors();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Xóa thất bại: " + (error.response?.data?.message || "Lỗi server"));
      }
    }
  };
  const columns = [
    {
      field: "doctorInfo",
      headerName: "Bác sĩ",
      flex: 2,
      minWidth: 320,
      renderCell: (params) => (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1 }}>
          <Avatar
            src={params.row.avatar}
            alt={params.row.fullName}
            sx={{
              width: 48,
              height: 48,
              border: "2px solid",
              borderColor: "grey.200",
            }}
          >
            {params.row.fullName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {params.row.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "specialization",
      headerName: "Chuyên khoa",
      flex: 2,
      minWidth: 320,
      renderCell: (params) => (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              {params.row.specialization}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mã số: {params.row.licenseNumber}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "experience",
      headerName: "Kinh nghiệm",
      flex: 1,
      minWidth: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 0.5
        }}>
          <Typography variant="body1" fontWeight={700} color="primary">
            {params.row.yearsExperience} năm
          </Typography>
          <Rating
            value={params.row.rating}
            readOnly
            size="small"
            precision={0.5}
            sx={{ fontSize: "0.95rem" }}
          />
        </Box>
      ),
    },
    {
      field: "isActive",
      headerName: "Trạng thái",
      flex: 0.8,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value ? "Hoạt động" : "Đã khóa"}
          color={params.value ? "success" : "error"}
          size="small"
          variant="outlined"
          sx={{ minWidth: 92, fontWeight: 600 }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 130,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Tooltip title="Chỉnh sửa">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleOpenEdit(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Xóa">
            <IconButton 
                color="error" 
                onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight={400} color="text.primary">
          Danh sách Bác sĩ
        </Typography>
        <Stack>
          <Button
            content="+ Thêm bác sĩ"
            variant="contained"
            onClick={() => setOpenCreate(true)}
          ></Button>
        </Stack>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <DataGrid
          rows={doctors}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          rowHeight={70}
          columnHeaderHeight={56}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
              borderBottom: "2px solid #e2e8f0",
              fontWeight: 600,
              textTransform: "uppercase",
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
              color: "text.secondary",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f1f5f9",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #e2e8f0",
            },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Box>
      <CreateDoctorDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={fetchDoctors}
      />
      <EditDoctorDialog
        open={openEdit}
        onClose={handleCloseEdit}
        doctorData={selected}
        onSuccess={fetchDoctors}
      />
    </Box>
  );
};

export default Doctors;