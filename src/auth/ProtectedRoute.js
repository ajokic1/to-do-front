import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "../services/auth";
import { ROUTES } from "../constants";

function ProtectedRoute({ children, ...props }) {
  if (!AuthService.isAuthenticated()) return <Redirect to={ROUTES.AUTH.LOGIN} />;

  return <Route {...props}>{children}</Route>;
}

export default ProtectedRoute;
