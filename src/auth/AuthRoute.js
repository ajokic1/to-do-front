import React from "react";
import { Redirect, Route } from "react-router-dom";

function AuthRoute({ children, ...props }) {
  const isAuthenticated = localStorage.getItem("user");

  if (isAuthenticated) return <Redirect to="/" />;

  return <Route {...props}>{children}</Route>;
}

export default AuthRoute;
