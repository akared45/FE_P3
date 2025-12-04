import React, { createContext, useEffect, useState } from "react";
import { authApi } from "../services/api";
import Cookies from "js-cookie";
import {
  setAccessToken,
  setRefreshToken,
  clearAccessToken,
  clearRefreshToken,
} from "../utils/authMemory";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await authApi.login({ email, password });
      const { accessToken, refreshToken } = res.data.auth;
      const userData = res.data.user;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(userData);
      Cookies.set("user", JSON.stringify(userData), { encode: false });
      console.log("Login success:", userData);
      return userData;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      throw error;
    }
  };

  const logout = () => {
    clearAccessToken();
    clearRefreshToken();
    setUser(null);
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
