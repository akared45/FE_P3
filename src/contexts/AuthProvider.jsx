import React, { createContext, useState } from "react";
import authApi from "../services/api";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  console.log("user:", user);

  // Hàm login
  const login = async (data) => {
    try {
      const res = await authApi.login(data); // { auth: { accessToken, refreshToken }, user }
      const { accessToken } = res.data.auth;
      const userData = res.data.user;

      setAccessToken(accessToken);
      setUser(userData);

      console.log("Login success:", userData);
      return userData;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      throw error;
    }
  };

  // Hàm logout
  const logout = () => {
    setAccessToken(null);
    setUser(null);
    Cookies.remove("refreshToken");
    console.log("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
