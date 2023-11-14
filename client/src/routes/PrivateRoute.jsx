//imports
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { authenticated, loading } = useAuth();
  if (authenticated === false) return null;
  else if (authenticated && !loading) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
