import axiosClient from "./axiosClient";

const authApi = {
    login(data) {
        return axiosClient.post("/auth/login", data);
    },
    register(data) {
        return axiosClient.post("/auth/register", data);
    },
    refreshToken() {
        return axiosClient.post("/auth/refresh");
    },
    getMe() {
        return axiosClient.get("/"); 
    }
};

export default authApi;