import axiosClient from "./axiosClient";

/* ============================
   AUTH API
============================ */
export const authApi = {
  login: (data) => axiosClient.post("/auth/login", data),

  register: (data) => axiosClient.post("/auth/register", data),

  refreshToken: () => axiosClient.post("/auth/refresh"),

  logout: () => axiosClient.post("/auth/logout"),

  getMe: () => axiosClient.get("/auth/me"), // ❗ Chuẩn REST hơn "/"
};

/* ============================
   DOCTOR API
============================ */
export const doctorApi = {
  getAll: () => axiosClient.get("/doctors"),

  create: (data) => axiosClient.post("/admin/doctors", data),

  update: (id, data) => axiosClient.put(`/admin/doctors/${id}`, data),

  delete: (id) => axiosClient.delete(`/admin/users/${id}`),

  getById: (id) => axiosClient.get(`/doctors/${id}`) 
};

/* ============================
   PATIENT API
============================ */
export const patientApi = {
  getAll: () => axiosClient.get("/patients"),

  delete: (id) => axiosClient.delete(`/admin/users/${id}`), // xoá user bệnh nhân
};

/* ============================
   SPECIALIZATION API
============================ */
export const specApi = {
  getAll: () => axiosClient.get("/specializations"),
};

/* ============================
   ADMIN API (nếu cần)
============================ */
export const adminApi = {
  getAdmin: () => axiosClient.get("/admin/doctors/U003"),
};

export const appointmentApi = {
  book(data) {
    return axiosClient.post("/appointments", data);
  }
};
/* ============================
   UPLOAD API
============================ */
export const uploadApi = {
  uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
