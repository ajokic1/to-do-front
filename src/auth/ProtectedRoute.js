import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ children, ...props }) {
  const isAuthenticated = localStorage.getItem("user");
  console.log(isAuthenticated);
  if (!isAuthenticated) return <Redirect to="/auth/login" />;

  return <Route {...props}>{children}</Route>;
}

export default ProtectedRoute;
