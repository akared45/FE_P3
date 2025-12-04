import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectRoutes = ({ children }) => {
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  if (!user || user.userType !== "admin") return <Navigate to="/dang-nhap" />;
  return children;
};

export default ProtectRoutes;
