import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
const ProtectRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (!user || user.userType !== "admin") return <Navigate to="/dang-nhap" />;
  return children;
};

export default ProtectRoutes;
