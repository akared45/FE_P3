import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "../utils/authMemory";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  withCredentials: true,
});

const axiosRefresh = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if ((error.response?.status === 401 || error.response?.status === 403) && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('/auth/refresh')) {
      
      originalRequest._retry = true;
      console.log("🔄 Interceptor: Phát hiện lỗi 401, bắt đầu refresh token...");
      
      try {
        console.log("🔄 Gọi API /auth/refresh...");
        const res = await axiosRefresh.post("/auth/refresh");
        const { accessToken } = res.data;
        
        console.log("✅ Nhận accessToken mới thành công");
        setAccessToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        console.log("🔄 Retry request ban đầu:", originalRequest.url);
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.log("❌ Refresh token thất bại:", refreshError.response?.status);
        clearAccessToken();
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;