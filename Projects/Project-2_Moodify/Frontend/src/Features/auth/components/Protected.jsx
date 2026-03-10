import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { Navigate } from "react-router-dom";
import Loader from "../../shared/components/Loader.jsx";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
