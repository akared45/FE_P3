import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import {
  DataGrid,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { patientApi } from "../../../services/api";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const formatDate = (dateStr) => {
    if (!dateStr) return "Chưa có";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "Khong hop le" : date.toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await patientApi.getAll();
        const mapped = res.data.map((p) => ({
          id: p.id,
          fullName: p.fullName || "",
          email: p.email || "",
          gender: p.gender === "Male" ? "Nam" : p.gender === "Female" ? "Nu" : "Khác",
          dateOfBirth: formatDate(p.dateOfBirth),
          originalDate: p.dateOfBirth,
        }));
        setPatients(mapped);
      } catch (error) {
        alert("Khong the tai danh sach benh nhan");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure!")) return;

    try {
      await patientApi.delete(id);
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert("Failed!");
    }
  };

  const filteredRows = patients.filter(
    (row) =>
      row.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "Họ và tên", flex: 1, minWidth: 220 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 240 },
    { field: "gender", headerName: "Giới tính", width: 110, align: "center", headerAlign: "center" },
    { field: "dateOfBirth", headerName: "Ngày sinh", width: 130 },
    {
      field: "actions",
      headerName: "Xóa",
      width: 100,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title="Xoa benh nhan">
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            sx={{ minWidth: 40 }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Tooltip>
      ),
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer sx={{ justifyContent: "flex-end", p: 2 }}>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Tìm tên hoặc email..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: 320 }}
      />
    </GridToolbarContainer>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={8} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box sx={{ bgcolor: "primary.main", color: "white", p: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Danh sách bệnh nhân
          </Typography>
        </Box>

        <Box sx={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            checkboxSelection
            loading={loading}
            components={{ Toolbar: CustomToolbar }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#f5f5f5",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Patients;