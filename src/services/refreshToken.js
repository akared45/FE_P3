import axios from "axios";
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAccessToken,
} from "../utils/authMemory";

const axiosRefresh = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  withCredentials: true,
});

export const refreshTokenRequest = async () => {
  const currentRefresh = getRefreshToken();
  if (!currentRefresh) {
    clearAccessToken();
    throw new Error("Refresh Token missing — login again.");
  }

  const res = await axiosRefresh.post("/auth/refresh", {
    refreshToken: currentRefresh,
  });

  const { accessToken, refreshToken } = res.data;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);

  console.log("🔄 Token refreshed!");

  return { accessToken, refreshToken };
};
