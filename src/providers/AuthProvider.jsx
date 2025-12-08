import React, { createContext, useEffect, useState } from "react";
import { authApi } from "../services/api";
import {
  setAccessToken,
  clearAccessToken,
} from "../utils/authMemory";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await authApi.login({ email, password });
      const { accessToken } = res.data.auth;
      const userData = res.data.user;
      setAccessToken(accessToken);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      clearAccessToken();
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};