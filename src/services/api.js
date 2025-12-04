import axiosClient from "./axiosClient";

export const authApi = {
  async login(data) {
    const res = await axiosClient.post("/auth/login", data);
    return res;
  },
  async register(data) {
    const res = await axiosClient.post("/auth/register", data);
    console.log(res);
    return res;
  },
  async refreshToken() {
    const res = await axiosClient.post("/auth/refresh");
    return res;
  },
  async getMe() {
    const res = await axiosClient.get("/");
    return res;
  },
};

export const doctorApi = {
  async getAll() {
    const res = await axiosClient.get("/doctors");
    return res.data;
  },
};

export const adminApi = {
  async getAdmin() {
    const res = await axiosClient.get(`/admin/doctors/U003`);
    return res;
  },
};

export const patientApi = {
  async getAll() {
    const res = await axiosClient.get("/patients");
    console.log(res);
    return res;
  },
};
