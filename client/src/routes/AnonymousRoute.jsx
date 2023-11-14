//imports
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AnonymousRoute = () => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default AnonymousRoute;
