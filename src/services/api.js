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

  async create(data) {
    return axiosClient.post("/admin/doctors", data);
  },

  async delete(id) {
    return await axiosClient.delete(`/admin/users/${id}`);
  },

  async update(id, data) {              
    return await axiosClient.put(`/admin/doctors/${id}`, data);
  },

  async getById(id) {
    return axiosClient.get(`/users/${id}`); 
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
    return res;
  },
  async delete(id) {
    return await axiosClient.delete(`/admin/users/${id}`);
  },
};

export const specApi={
  async getAll(){
    const res = await axiosClient.get("/specializations");
    return res
  }
}